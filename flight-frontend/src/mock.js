export const ORDER_LIST = [
  {
    order_id: 0,
    flight_id: 0,
    flight_model: "国泰航空",
    from_city: "南京",
    to_city: "北京",
    from_airport: "禄口国际机场T2",
    to_airport: "大兴国际机场",
    depature_time: "13: 00",
    arrival_time: "15: 00",
    order_time: "2021/12/31",
    status: "待出行",
    user_name: "b18030407",
    order_price: 349,
  },
  {
    order_id: 1,
    flight_id: 1,
    flight_model: "国泰航空",
    from_city: "南京",
    to_city: "北京",
    from_airport: "禄口国际机场T2",
    to_airport: "首都国际机场T3",
    depature_time: "14: 00",
    arrival_time: "18: 00",
    order_time: "2021/12/31",
    status: "已完成",
    user_name: "b18030407",
    order_price: 600,
  },
];

export const ORDER_LIST_LARGE = new Array(100)
  .fill(ORDER_LIST[0])
  .map((item, index) => ({ ...item, order_id: index }));

export const FLIGHT_LIST = [
  {
    flight_id: 0,
    flight_model: "国泰航空",
    from_city: "南京",
    to_city: "北京",
    from_airport: "禄口国际机场T2",
    to_airport: "大兴国际机场",
    depature_time: "13: 00",
    arrival_time: "15: 00",
    original_price: 1280,
    current_price: 349,
    remain_seats: 5,
  },
  {
    flight_id: 1,
    flight_model: "国泰航空",
    from_city: "南京",
    to_city: "北京",
    from_airport: "禄口国际机场T2",
    to_airport: "首都国际机场T3",
    depature_time: "14: 00",
    arrival_time: "18: 00",
    original_price: 1580,
    current_price: 400,
    remain_seats: 5,
  },
];

export const FLIGHT_LIST_LARGE = new Array(100)
  .fill(FLIGHT_LIST[0])
  .map((item, index) => ({ ...item, flight_id: index }));
