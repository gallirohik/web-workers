const wFib = (n) => (n < 2 ? n : wFib(n - 1) + wFib(n - 2));

self.onmessage = (e) => {
  const { num } = e.data;
  const startTime = new Date().getTime();
  const fibNum = wFib(num);
  postMessage({
    fibNum,
    time: new Date().getTime() - startTime,
  });
};
