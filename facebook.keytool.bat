keytool -exportcert -alias app_affiliate -keystore ./app_affiliate-release-key.keystore | openssl sha1 -binary | openssl base64

pause