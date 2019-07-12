@echo off
echo "1. Create Release Android";
echo "2. Keytool"
echo "3. Jarsigner"
echo "4. Zipalign"
set /p id="Enter: "

if "%id%" == "1" (
	:: generate a release key
	echo "Create Release Android"
	START ionic cordova build --release android
) else (
	if "%id%" == "2" (
		:: comment this if you already have the keystore
		:: your-password
		echo "Keytool"
		START keytool -genkey -v -keystore ./your_app_name-release-key.keystore -alias your_app_name -keyalg RSA -keysize 2048 -validity 10000
	) else (
		if "%id%" == "3" (
			:: sign the apk
			echo "Jarsigner"
			START jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./your_app_name-release-key.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk your_app_name
		) else (
			if "%id%" == "4" (
				:: optimize the apk
				echo "Zipalign"
				START zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./platforms/android/app/build/outputs/apk/release/app.apk
			) else (
				echo "Unknown Input."
			)
		)
	)
)

PAUSE
