@echo off
echo "1. Create Release Android";
echo "2. Keytool (If you don't have any keystore)"
echo "3. Jarsigner"
echo "4. Zipalign"
set /p id="Enter: "

if "%id%" == "1" (
	:: generate a release key
	echo "Create Release Android"
	START cordova build --release android
) else (
	if "%id%" == "2" (
		set /p keytool="Are you sure to create new keystore, this will overwrite the existing keystore. (Y/N): "
		
		:: password
		if "%keytool%" == "Y" (
			:: password
			echo "Keytool"
			START keytool -genkey -v -keystore ./{app_name}-release-key.keystore -alias {app_name} -keyalg RSA -keysize 2048 -validity 10000
		)
	) else (
		if "%id%" == "3" (
			:: sign the apk
			echo "Jarsigner"
			START jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./{app_name}-release-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk {app_name}
		) else (
			if "%id%" == "4" (
				:: optimize the apk
				echo "Zipalign"
				START zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./platforms/android/build/outputs/apk/release.apk
			) else (
				echo "Unknown Input."
			)
		)
	)
)