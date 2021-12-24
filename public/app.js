const h1 = document.querySelector('#h1');

// window.addEventListener('load', async () => {
//   fetch('http://localhost:3001/list').then((res) =>
//     res.json().then((data) => {
//       var table = new Tabulator('#example-table', {
//         height: '311px',
//         layout: 'fitColumns',
//         data,
//         autoColumns: true,
//       });
//     })
//   );
// });

setInterval(() => {
  fetch('http://localhost:3001/list').then((res) =>
    res.json().then((data) => {
      var table = new Tabulator('#example-table', {
        layout: 'fitColumns',
        data,
        autoColumns: true,
      });
    })
  );
}, 90000);
