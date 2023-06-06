export const sendMessageHttp = jest
  .fn((payload) =>
    Promise.resolve({
      status: 200,
      statusText: "OK"
    })
  )
  .mockImplementationOnce((payload) =>
    Promise.resolve({
      status: 500,
      statusText: "Failed"
    })
  );
