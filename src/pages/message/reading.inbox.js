"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var config_1 = require("../../lib/config");
var socket_1 = require("../../lib/socket");
var views_1 = require("../../lib/views");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ReadingInboxPage = (function () {
  function ReadingInboxPage(nav, messageProvider, params, loadingCtrl, auth, changeDetectorRef) {
    this.nav = nav;
    this.messageProvider = messageProvider;
    this.params = params;
    this.loadingCtrl = loadingCtrl;
    this.auth = auth;
    this.changeDetectorRef = changeDetectorRef;
    // infinite scroll up
    this.previousScrollPosition = 0;
    this.init_loading = true;
    this.is_fetching = false;
    this.data_list = [];
    this.page = 1;
    this.to_id = 0;
    this.chatBox = null;
    console.log('From ID: ' + params.get('from_id'));
    this.to_id = params.get('from_id');
  }

  ReadingInboxPage.prototype.initView = function () {
    var thisApp = this;
    thisApp.me = thisApp.auth.user();
    // load the messages
    thisApp.fetchMessages();
    // file on change
    jQ(document).off().on('change', '#messageFile', function () {
      thisApp.setFiles(this);
    });
    // Infinite scroll up
    thisApp.content.ionScroll.subscribe(function ($event) {
      var page = $event.contentHeight;
      var scrolled = $event.scrollTop;
      var direction = thisApp.previousScrollPosition > scrolled ? 'top' : 'bottom';
      thisApp.previousScrollPosition = scrolled;
      // trigger infinite when we are at 10% from top
      if (scrolled < page * 0.30) {
        if (!thisApp.is_fetching && direction == 'top') {
          console.log('Scrolling Up...');
          // load the messages
          thisApp.fetchMessages();
        }
      }
    });
  };
  ReadingInboxPage.prototype.ionViewDidEnter = function () {
    var thisApp = this;
    // private messaging
    config_1.WBConfig.private_message_on_view = true;
    socket_1.WBSocket.emitter.addListener('msg_received', function (received) {
      // make sure this message is not from YOU or else multiple same message will be added to list
      // always check the id where the messages coming from if is really from the current list is viewing
      if (received.from_id == thisApp.to_id) {
        // add to list of message
        thisApp.data_list.push(received);
      }
    });
    // initialize
    thisApp.initView();
  };
  ReadingInboxPage.prototype.ionViewDidLeave = function () {
    console.log('Leaving Private Messaging: ' + this.to_id);
    // private messaging
    config_1.WBConfig.private_message_on_view = false;
    socket_1.WBSocket.emitter.removeEvent('private_message');
  };
  /**
   * Fetch messages
   */
  ReadingInboxPage.prototype.fetchMessages = function () {
    var thisApp = this;
    // the application is still fetch data to server
    if (thisApp.is_fetching) {
      return;
    }
    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.messageProvider.reading(thisApp.to_id, thisApp.page)
      .subscribe(function (response) {
        for (var i = 0; i < response.data.length; i++) {
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
  };
  /**
   * Send file message
   *
   * @param file
   */
  ReadingInboxPage.prototype.sendFile = function (file) {
    var thisApp = this;
    var loading = views_1.WBView.loading(this.loadingCtrl, 'Uploading...');
    // send your message
    thisApp.messageProvider.send(this.to_id, {
      files: {
        msg_file: file
      }
    }, function (response) {
      loading.dismiss();
      thisApp.data_list.push(response.data);
      thisApp.chatBox = null;
    }, function (error) {
      loading.dismiss();
    });
  };
  /**
   * Send text message
   *
   * @param text
   */
  ReadingInboxPage.prototype.sendText = function (text) {
    var thisApp = this;
    // don't send if null
    if (!text || text == '' || text == null) {
      return;
    }
    // send your message
    thisApp.messageProvider.send(this.to_id, {
      inputs: {
        message: text
      }
    }, function (response) {
      thisApp.data_list.push(response.data);
      // reset the chat box input
      thisApp.chatBox = null;
    }, function (error) {
    });
  };
  /**
   * Complete loading contents
   */
  ReadingInboxPage.prototype.completeFetch = function () {
    this.is_fetching = false;
  };
  /**
   * Scroll to bottom
   */
  ReadingInboxPage.prototype.scrollToBottom = function () {
    var thisApp = this;
    var dimensions = this.content.getContentDimensions();
    console.log('Scrolling to bottom, Y: ' + dimensions.contentHeight);
    thisApp.content.scrollTo(0, dimensions.contentHeight, 300);
  };
  /**
   * Open the dialog for images
   */
  ReadingInboxPage.prototype.openFileDialog = function () {
    jQ('#messageFile').off().click();
  };
  /**
   * Set the file on change
   *
   * @param input
   */
  ReadingInboxPage.prototype.setFiles = function (input) {
    if (input.files && input.files[0]) {
      this.sendFile(input.files[0]);
    }
  };
  __decorate([
    core_1.ViewChild(ionic_angular_1.Content)
  ], ReadingInboxPage.prototype, "content", void 0);
  ReadingInboxPage = __decorate([
    core_1.Component({
      templateUrl: 'reading.inbox.html'
    })
  ], ReadingInboxPage);
  return ReadingInboxPage;
}());
exports.ReadingInboxPage = ReadingInboxPage;
