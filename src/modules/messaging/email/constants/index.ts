const mailjetSender = {
  email: "contact@paps.sn",
  name: "Paps"
};

const PAPS_TEMPLATE_ID = 1596565;
const PAPS_TEMPLATE_ID_2 = 2015942;

const template = {
  1: {
    name: "new_account",
    id: PAPS_TEMPLATE_ID
  },
  2: {
    name: "order_received",
    id: PAPS_TEMPLATE_ID_2
  }
};

export { mailjetSender, template };
