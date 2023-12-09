class Enums {
  static ShipType = {
    COME: "COME",
    DELIVERY: "DELIVERY",
  };
  static OrderStatus = {
    RECEIVING: "RECEIVING",
    PROCESSING: "PROCESSING",
    PACKING: "PACKING",
    SHIPPING: "SHIPPING",
    DELIVERED: "DELIVERED",
    DONE: "DONE",
  };
  static BillTypes = {
    QPAY: "QPAY",
    CASH: "CASH",
  };
} 

module.exports = Enums