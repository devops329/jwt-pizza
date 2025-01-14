enum Role {
  Diner = 'diner',
  Franchisee = 'franchisee',
  Admin = 'admin',
}

namespace Role {
  export function isRole(user: User | null, role: Role): boolean {
    return user != null && Array.isArray(user.roles) && !!user.roles.find((r) => r.role === role);
  }
}

type Menu = Pizza[];

type Pizza = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
};

type OrderItem = {
  menuId: string;
  description: string;
  price: number;
};

type Order = {
  id: string;
  franchiseId: string;
  storeId: string;
  date: string;
  items: OrderItem[];
};

type OrderResponse = {
  order: Order;
  jwt: string;
};

type OrderHistory = {
  id: string;
  dinerId: string;
  orders: Order[];
};

type UserRole = {
  role: Role;
  objectId?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
};

type Store = {
  id: string;
  name: string;
  totalRevenue?: number;
};

type Franchise = {
  id: string;
  admins?: { email: string; id?: string; name?: string }[];
  name: string;
  stores: Store[];
};

type Endpoint = {
  requiresAuth: boolean;
  method: string;
  path: string;
  description: string;
  example: string;
  response: any;
};

type Endpoints = {
  endpoints: Endpoint[];
};

type JWTPayload = {
  message: string;
  payload: string;
};

interface PizzaService {
  login(email: string, password: string): Promise<User>;
  register(email: string, password: string, role: string): Promise<User>;
  logout(): Promise<void>;
  getUser(): Promise<User | null>;
  getMenu(): Promise<Menu>;
  getOrders(user: User): Promise<OrderHistory>;
  order(order: Order): Promise<OrderResponse>;
  verifyOrder(jwt: string): Promise<JWTPayload>;
  getFranchise(user: User): Promise<Franchise[]>;
  createFranchise(franchise: Franchise): Promise<Franchise>;
  getFranchises(): Promise<Franchise[]>;
  closeFranchise(franchise: Franchise): Promise<void>;
  createStore(franchise: Franchise, store: Store): Promise<Store>;
  closeStore(franchise: Franchise, store: Store): Promise<null>;
  docs(docType: string): Promise<Endpoints>;
}

export { Role, PizzaService, User, Menu, Pizza, OrderHistory, Order, Franchise, Store, OrderItem, Endpoint, Endpoints, OrderResponse, JWTPayload };
