<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EVENUP Onboarding</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
    :root {
      --eu-black: #0b0b0c;
      --eu-gray: #1a1a1c;
      --eu-gold: #c9a86a;
      --eu-electric: #4dd2ff;
    }

    body {
      background-color: var(--eu-black);
      color: #fff;
      font-family: "Inter", sans-serif;
    }

    .step-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--eu-gold);
      margin-bottom: 1rem;
    }

    .eu-card {
      background-color: var(--eu-gray);
      border: 1px solid #222;
      padding: 2rem;
      border-radius: 10px;
    }

    .eu-btn {
      background-color: var(--eu-gold);
      border: none;
      padding: 0.75rem 2rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .deal-option {
      border: 1px solid #333;
      padding: 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
    }

    .deal-option:hover {
      border-color: var(--eu-gold);
      background-color: #111;
    }

    .deal-option.active {
      border-color: var(--eu-electric);
      background-color: #0f0f11;
    }

    .progress {
      height: 6px;
      background-color: #333;
    }

    .progress-bar {
      background-color: var(--eu-electric);
    }
  </style>
</head>

<body>

  <div class="container py-5">

    <!-- PROGRESS BAR -->
    <div class="progress mb-5">
      <div id="progressBar" class="progress-bar" style="width: 25%;"></div>
    </div>

    <!-- STEP 1: ARTIST IDENTITY -->
    <div id="step1" class="eu-card">
      <h2 class="step-title">Artist Identity</h2>
      <p class="mb-4">Tell us who you are. Your story shapes your rollout.</p>

      <div class="mb-3">
        <label class="form-label">Artist Name</label>
        <input type="text" class="form-control" id="artistName">
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" id="artistEmail">
      </div>

      <button class="btn eu-btn mt-3" onclick="nextStep(2)">Continue</button>
    </div>

    <!-- STEP 2: DEAL TYPE -->
    <div id="step2" class="eu-card d-none">
      <h2 class="step-title">Choose Your Deal</h2>
      <p class="mb-4">Select the partnership that aligns with your vision.</p>

      <div class="deal-option mb-3" onclick="selectDeal(this, 'Non‑Exclusive Single')">
        <h5 class="text-white">Non‑Exclusive Single</h5>
        <p class="text-muted">Release one‑off records while keeping full ownership.</p>
      </div>

      <div class="deal-option mb-3" onclick="selectDeal(this, 'Exclusive Recording')">
        <h5 class="text-white">Exclusive Recording</h5>
        <p class="text-muted">Creative development, rollout strategy, long‑term vision.</p>
      </div>

      <div class="deal-option mb-3" onclick="selectDeal(this, 'Distribution‑Only')">
        <h5 class="text-white">Distribution‑Only</h5>
        <p class="text-muted">Stay independent while we power your reach.</p>
      </div>

      <button class="btn eu-btn mt-3" onclick="nextStep(3)">Continue</button>
    </div>

    <!-- STEP 3: UPLOAD MUSIC -->
    <div id="step3" class="eu-card d-none">
      <h2 class="step-title">Upload Your Music</h2>
      <p class="mb-4">We accept WAV, MP3, AIFF, or ZIP bundles.</p>

      <input type="file" class="form-control mb-4" id="musicFile">

      <button class="btn eu-btn" onclick="nextStep(4)">Continue</button>
    </div>

    <!-- STEP 4: REVIEW -->
    <div id="step4" class="eu-card d-none">
      <h2 class="step-title">Review & Submit</h2>
      <p class="mb-4">Confirm your details before sending your submission.</p>

      <ul class="list-group mb-4">
        <li class="list-group-item bg-dark text-white">Artist: <span id="reviewName"></span></li>
        <li class="list-group-item bg-dark text-white">Email: <span id="reviewEmail"></span></li>
        <li class="list-group-item bg-dark text-white">Deal: <span id="reviewDeal"></span></li>
      </ul>

      <button class="btn eu-btn" onclick="submitToEvenup()">Submit to EVENUP</button>
	  
<script>
  async function submitToEvenup() {
    const file = document.getElementById("musicFile").files[0];
    const fileBase64 = await toBase64(file);

    const payload = {
      artistName: document.getElementById("artistName").value,
      artistEmail: document.getElementById("artistEmail").value,
      dealType: selectedDeal,
      fileName: file.name,
      fileBase64,
      submittedAt: new Date().toISOString()
    };

    const res = await fetch("https://evenup-portal.vercel.app/api/submit-onboarding", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});



    const data = await res.json();
    console.log(data);
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
</script>

    </div>

  </div>

  <script>
    let selectedDeal = null;

    function nextStep(step) {
      document.querySelectorAll('.eu-card').forEach(card => card.classList.add('d-none'));
      document.getElementById('step' + step).classList.remove('d-none');

      const progress = step * 25;
      document.getElementById('progressBar').style.width = progress + '%';

      if (step === 4) {
        document.getElementById('reviewName').innerText = document.getElementById('artistName').value;
        document.getElementById('reviewEmail').innerText = document.getElementById('artistEmail').value;
        document.getElementById('reviewDeal').innerText = selectedDeal;
      }
    }

    function selectDeal(el, deal) {
      document.querySelectorAll('.deal-option').forEach(opt => opt.classList.remove('active'));
      el.classList.add('active');
      selectedDeal = deal;
    }
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  
  <script>
  async function submitToEvenup() {
    alert("Submit function is running — now connect it to your backend.");
  }
</script>


</body>
</html>
