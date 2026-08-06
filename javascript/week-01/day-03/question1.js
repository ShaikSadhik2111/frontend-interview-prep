//create student teacher employee
// for all this one function should be common use call() apply() bind()

const student = {
    name: "Sadhik",
    age: 20,
    city: "Hyderabad"
};
const teacher = {
    name: "Basha",
    age: 30,    
    city: "Chennai"
};
const employee = {
    name: "Ravi",
    age: 25,
    city: "Bangalore"
};

function introduce(greeting, profession) {
    console.log(`${greeting}, I am ${this.name}. I am a ${profession} from ${this.city}.`);
}

introduce.call(student, "Hello", "student");
introduce.call(teacher, "Hi", "teacher");
introduce.call(employee, "Greetings", "employee");

introduce.apply(student, ["Hello", "student"]);
introduce.apply(teacher, ["Hi", "teacher"]);
introduce.apply(employee, ["Greetings", "employee"]);

introduce.bind(student, "Hello", "student")();
introduce.bind(teacher, "Hi", "teacher")();
introduce.bind(employee, "Greetings", "employee")();