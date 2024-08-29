import 'dotenv/config'
export const welcomePage = (name,lastname) =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .itim-regular {
      font-family: "Itim", cursive;
      font-weight: 400;
      font-style: normal;
    }
    .grid {
      display: grid;
    }
    .bg-n5 {
      background-color: #433526;
    }
    .text-n6{
      color: #fcf8f0;
    }
    .text-center {
      text-align: center;
    }
  </style>
</head>
<body class="itim-regular text-n6 bg-n5 text-center grid">
  <h1>Welcome ${name} ${lastname} to Animalife!</h1>
  <h2>Thanks for joining us!</h2>
  <a href="${process.env.FRONTEND_URL}">Check our products</a>
  <h3>Have a nice day!</h3>
  <h4>Animalife Support Team</h4>
</body>
</html>`

export const purchasePage = (name, lastname, products, total, id) =>

  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
      .itim-regular {
        font-family: "Itim", cursive;
        font-weight: 400;
        font-style: normal;
      }
      .grid {
        display: grid;
      }
      .justify-items-center {
        justify-items: center;
      }
      .items-center {
        align-items: center;
      }
      .text-center {
        text-align: center;
      }
      .bg-n1 {
        background-color: #f2e0c2;
      }
      article{
        background-color: #a38449;
      }
    </style>
  </head>
  <body class="itim-regular bg-n1 grid justify-items-center items-center text-center">
    <h1 style="text-align: center;">Thanks for your purchase ${name} ${lastname}!</h1>
    <h2>Order ID: ${id}</h2>
    <a href="${process.env.FRONTEND_URL}/order/${id}">Here you can see the full order</a>
    <h2>Here are your products:</h2>
    ${products.map((product) => `
      <hr>
      <article>
        <h3>ID: ${product._id}</h3>
        <h4>Price: $${(product.price)}</h4>
        <h4>Quantity: ${product.quantity}</h4>
      </article>
      <hr>
      `)}
    <h2>Total: $${total.toFixed(2)}</h2>
    <h3>Have a nice day!</h3>
    <a href="${process.env.FRONTEND_URL}">Check our products</a>
    <p>Animalife Support Team.</p>
  </body>
  </html>`