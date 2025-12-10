{
  lib,
  stdenv,
  fetchurl,
  dpkg,
  makeWrapper,
  jdk21,
  fontconfig,
  xorg,
  glib,
  gtk3,
  openjfx21,
}: let
  version = "21.3";
in
  stdenv.mkDerivation rec {
    pname = "screaming-frog-seo-spider";
    inherit version;

    src = fetchurl {
      url = "https://download.screamingfrog.co.uk/products/seo-spider/screamingfrogseospider_${version}_all.deb";
      sha256 = "sha256-trg9nl7xyw17vcWOqDcLG1GWM553VlyieykqERukuT0=";
    };

    nativeBuildInputs = [
      dpkg
      makeWrapper
    ];

    buildInputs = [
      jdk21
      fontconfig
      xorg.libXxf86vm
      glib
      gtk3
      openjfx21
    ];

    unpackPhase = "dpkg-deb -x $src .";

    installPhase = ''
      # Create necessary directories
      mkdir -p $out/{bin,share}

      # Copy all files from usr/share maintaining structure
      cp -r usr/share/* $out/share/

      # Copy the executable from usr/bin if it exists
      cp -r usr/bin/* $out/bin/

      # Remove bundled JRE as we'll use the one from nixpkgs
      rm -rf $out/share/screamingfrogseospider/jre

      # Create wrapper for the main executable
      makeWrapper ${jdk21}/bin/java $out/bin/screamingfrogseospider \
        --prefix PATH : ${lib.makeBinPath buildInputs} \
        --prefix LD_LIBRARY_PATH : ${lib.makeLibraryPath buildInputs} \
        --set JAVA_HOME ${jdk21} \
        --add-flags "--module-path ${openjfx21}/lib" \
        --add-flags "-jar $out/share/screamingfrogseospider/ScreamingFrogSEOSpider.jar"

      # Make the executable executable
      chmod +x $out/bin/screamingfrogseospider
    '';

    meta = with lib; {
      description = "Website crawler and SEO spider software";
      homepage = "https://www.screamingfrog.co.uk/seo-spider/";
      license = licenses.unfree;
      maintainers = with maintainers; [];
      platforms = ["x86_64-linux"];
    };
  }
