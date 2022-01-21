const w_ordinal_suffix = (num) => {
  // 1st, 2nd, 3rd, 4th, etc.
  const j = num % 10;
  const k = num % 100;
  switch (true) {
    case j === 1 && k !== 11:
      return num + "st";
    case j === 2 && k !== 12:
      return num + "nd";
    case j === 3 && k !== 13:
      return num + "rd";
    default:
      return num + "th";
  }
};
const w_textCont = (n, fibNum, time) => {
  const nth = w_ordinal_suffix(n);
  return `
  <p id='timer'>Time: <span class='bold'>${time} ms</span></p>
  <p><span class="bold" id='nth'>${nth}</span> fibonnaci number: <span class="bold" id='sum'>${fibNum}</span></p>
  `;
};

const w_errPar = document.getElementById("error");
const w_btn = document.getElementById("submit-btn");
const w_input = document.getElementById("number-input");
const w_resultsContainer = document.getElementById("results-container");
// const worker = new window.Worker("./workers/fib-worker.js"); Replaces with incomming request with currenlty running worker.

w_btn.addEventListener("click", (e) => {
  const worker = new window.Worker("./workers/fib-worker.js");

  w_errPar.textContent = "";
  const num = window.Number(w_input.value);

  if (num < 2) {
    w_errPar.textContent = "Please enter a number greater than 2";
    return;
  }

  worker.postMessage({ num });
  worker.onerror = (err) => err;
  worker.onmessage = (e) => {
    const { time, fibNum } = e.data;
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = w_textCont(num, fibNum, time);
    resultDiv.className = "result-div";
    w_resultsContainer.appendChild(resultDiv);
    worker.terminate();
  };
});
