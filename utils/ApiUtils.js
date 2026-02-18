class ApiUtils {         
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() { // call LoginApi to get token
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad) {     // call getToken()(loginApi) to get token in createOrder()
        let response = {}; // just create empty responce variable,so we can store token and orderId                       
        response.token = await this.getToken();// getToken() pasun token milavala  // this Keyword: क्लासच्या एका मेथडमधून दुसरी मेथड कॉल करण्यासाठी (उदा. createOrder मधून getToken), किंवा व्हेरिएबल ॲक्सेस करण्यासाठी this कीवर्ड वापरणे गरजेचे आहे.//jya method la async ahe ani ti method jar call karaychi asel tar tyachyasamor await lavane
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token, // getToken() pasun token milavala to token ithe vaprla
                'Content-Type': 'application/json'
                     }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;// orderId response madhe add keli
 
        return response;// ata response madhe token n responseId donhi ahet
    }
}

module.exports = { ApiUtils }; /* या फाईलमध्ये बनवलेला APIUtils हा क्लास दुसऱ्या फाईलमध्ये वापरण्यासाठी उपलब्ध करून देणे // फाईलच्या शेवटी हे लिहिल्यामुळे हा क्लास 'Public' होतो. // finally make current class available to public */                         