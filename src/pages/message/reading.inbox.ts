/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {ChangeDetectorRef, Component, NgModule, ViewChild} from "@angular/core";
import {Content, LoadingController, NavController, NavParams} from "ionic-angular";
import {MessageProvider} from "../../providers/message-provider";
import {WBConfig} from "../../lib/config";
import {WBSocket} from "../../lib/socket";
import {AuthProvider} from "../../providers/auth-provider";
import {WBView} from "../../lib/views";
import {WBHelper} from "../../lib/helper";
import {IonicImageLoader} from "ionic-image-loader";

declare let jQ;

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'reading.inbox.html'
})
export class ReadingInboxPage {
  @ViewChild(Content) content: Content;

  me: any;

  // infinite scroll up
  previousScrollPosition = 0;

  init_loading = true;
  is_fetching = false;

  data_list = [];
  page = 1;

  to_id = 0;
  chatBox = null;

  constructor(public nav: NavController, public messageProvider: MessageProvider, public params: NavParams,
              public loadingCtrl: LoadingController, public auth: AuthProvider, public changeDetectorRef: ChangeDetectorRef) {
    WBHelper.log('From ID: ' + params.get('from_id'));
    this.to_id = params.get('from_id');
  }

  initView() {
    let thisApp = this;
    thisApp.me = thisApp.auth.user();

    // load the messages
    thisApp.fetchMessages();

    // file on change
    jQ(document).off().on('change', '#messageFile', function () {
      thisApp.setFiles(this);
    });

    // Infinite scroll up
    thisApp.content.ionScroll.subscribe(function ($event) {
      let page = $event.contentHeight;
      let scrolled = $event.scrollTop;
      let direction = thisApp.previousScrollPosition > scrolled ? 'top' : 'bottom';
      thisApp.previousScrollPosition = scrolled;

      // trigger infinite when we are at 10% from top
      if (scrolled < page * 0.30) {
        if (!thisApp.is_fetching && direction == 'top') {
          WBHelper.log('Scrolling Up...');

          // load the messages
          thisApp.fetchMessages();
        }
      }
    });
  }

  ionViewDidEnter() {
    let thisApp = this;

    // private messaging
    WBConfig.private_message_on_view = true;
    WBSocket.emitter.addListener('msg_received', function (received) {
      // make sure this message is not from YOU or else multiple same message will be added to list
      // always check the id where the messages coming from if is really from the current list is viewing
      if (received.from_id == thisApp.to_id) {
        // add to list of message
        thisApp.data_list.push(received);
      }
    });

    // initialize
    thisApp.initView();
  }

  ionViewDidLeave() {
    WBHelper.log('Leaving Private Messaging: ' + this.to_id);

    // private messaging
    WBConfig.private_message_on_view = false;
    WBSocket.emitter.removeEvent('private_message');
  }

  /**
   * Fetch messages
   */
  fetchMessages() {
    let thisApp = this;

    // the application is still fetch data to server
    if (thisApp.is_fetching) {
      return;
    }

    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.messageProvider.reading(thisApp.to_id, thisApp.page)
      .subscribe(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          thisApp.data_list.unshift(response.data[i]);
        }

        // scroll to bottom
        if (thisApp.page == 1) {
          thisApp.scrollToBottom();
        }

        // update the page
        if (response.data.length) {
          thisApp.page++;
        }

        thisApp.completeFetch();
        thisApp.changeDetectorRef.detectChanges();
      }, function (error) {
        thisApp.completeFetch();
        thisApp.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Send file message
   *
   * @param file
   */
  sendFile(file) {
    let thisApp = this;
    let loading = WBView.loading(this.loadingCtrl, 'Uploading...');

    // send your message
    thisApp.messageProvider.send(this.to_id, {
      files: {
        msg_file: file
      }
    }).subscribe(function (response) {
      loading.dismiss();

      thisApp.data_list.push(response.data);
      thisApp.chatBox = null;
    }, function (e) {
      loading.dismiss();
    });
  }

  /**
   * Send text message
   *
   * @param text
   */
  sendText(text) {
    let thisApp = this;

    // don't send if null
    if (!text || text == '' || text == null) {
      return;
    }

    // send your message
    thisApp.messageProvider.send(this.to_id, {
      inputs: {
        message: text
      }
    }).subscribe(function (response) {
      thisApp.data_list.push(response.data);

      // reset the chat box input
      thisApp.chatBox = null;
    });
  }

  /**
   * Complete loading contents
   */
  completeFetch() {
    this.is_fetching = false;
  }

  /**
   * Scroll to bottom
   */
  scrollToBottom() {
    let thisApp = this;
    let dimensions = this.content.getContentDimensions();
    WBHelper.log('Scrolling to bottom, Y: ' + dimensions.contentHeight);

    thisApp.content.scrollTo(0, dimensions.contentHeight, 300);
  }

  /**
   * Open the dialog for images
   */
  openFileDialog() {
    jQ('#messageFile').off().click();
  }

  /**
   * Set the file on change
   *
   * @param input
   */
  setFiles(input) {
    if (input.files && input.files[0]) {

      this.sendFile(input.files[0]);
    }
  }
}
