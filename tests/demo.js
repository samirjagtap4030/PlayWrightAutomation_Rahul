// 1.jS datatypes(variables)-string,number,boolean,numbers[]

// if you dont convert js file into ts.but want to run ts file,you can run it with warning.
// you can run ts file with js script with warnings.you can do it.
let message = "Hello";  // 1. String 
// message = 2;                 
console.log(message);

let age = 20;           // 2. Number 
console.log(age);

let numbers = [1, 2, 3];    // 4. Array (नंबर्स् ची लिस्ट) // इथे आपण सांगतोय की 'numbers' हा फक्त number चा array आहे (`number[]`)

// आपण तिन्ही उदाहरणे (Function, Object, Class) पाहूया

// 1. Functions in JS
// इथे आपण a आणि b cha dataType kay ahe हे सांगत nahi 
function add(a, b) {
    return a + b;
}
 add(3, "4"); // 34
console.log(add(3, 4)); // 7