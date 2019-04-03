export default class Api {
  static BASE_URL = process.env.NODE_ENV === 'production' ? "http://api-production:8080/" : "http://localhost:8080/";
}
