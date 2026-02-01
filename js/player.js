let shakaPlayer = null;

function ensureModalExists() {
  if ($("#videoModal").length) return;

  $("body").append(`
    <div id="videoModal" style="
      display:none;
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.8);
      z-index:99999;
      align-items:center;
      justify-content:center;
      padding:16px;
    ">
      <div style="
        width:min(960px, 100%);
        background:#111;
        border-radius:14px;
        padding:12px;
        position:relative;
      ">
        <button id="closeVideoModal" style="
          position:absolute;
          top:10px;
          right:10px;
          background:rgba(255,255,255,0.15);
          color:#fff;
          border:0;
          border-radius:10px;
          padding:6px 10px;
          cursor:pointer;
        ">✕</button>

        <video id="shakaVideo" controls style="
          width:100%;
          max-height:75vh;
          border-radius:12px;
          background:black;
        "></video>
      </div>
    </div>
  `);
}

async function loadManifest(manifestUrl) {
  shaka.polyfill.installAll();

  if (!shaka.Player.isBrowserSupported()) {
    alert("Your browser does not support Shaka Player.");
    return;
  }

  ensureModalExists();

  $("#videoModal").css("display", "flex");
  $("body").css("overflow", "hidden");

  const video = document.getElementById("shakaVideo");

  // Create player only once
  if (!shakaPlayer) {
    shakaPlayer = new shaka.Player(video);
  }

  // Important: unload previous stream before loading a new one
  await shakaPlayer.unload();
  await shakaPlayer.load(manifestUrl);

  video.play().catch(() => {});
}

function closeVideoModal() {
  const video = document.getElementById("shakaVideo");
  if (video) video.pause();

  $("#videoModal").hide();
  $("body").css("overflow", "");
}

// Click on the play button
$(document).on("click", "a.video-popup", async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const manifestUrl = $(this).attr("href"); // <-- read from HTML
  if (!manifestUrl) return;

  try {
    await loadManifest(manifestUrl);
  } catch (err) {
    console.error(err);
    alert("Failed to load DASH video.");
  }
});

// Close handlers
$(document).on("click", "#closeVideoModal", function () {
  closeVideoModal();
});

$(document).on("click", "#videoModal", function (e) {
  if (e.target.id === "videoModal") closeVideoModal();
});

$(document).on("keydown", function (e) {
  if (e.key === "Escape") closeVideoModal();
});
