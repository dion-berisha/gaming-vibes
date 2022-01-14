exports.handler = async (event, context) => {
  const users = [
    { title: "Lorem ipsum dolor sit amet consectetur", author: "john" },
    { title: "Lorem ipsum dolor sit amet consectet", author: "mario" },
    { title: "Ultimate Street Fighter", author: "chun-li" },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ mssg: "you must be logged in to see this!" }),
  };
};
