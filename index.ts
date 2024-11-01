#! /usr/bin/env node


import inquirer from "inquirer"

// student class
class student{
    static counter = 15000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 2000;
    }

    //method for enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course);
        
    }

    //method for veiw balance of student
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    //method to pay student fee
    pay_fees (amount: number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid Successfully for ${this.name}`);
        console.log(`Remaining Balance: $${this.balance}`);

    }

    //method for show status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }


}

//class for management for students_manager
class Students_manager {
    students: student[]
    static add_student: any;
    static enroll_student: any;
    static balance_input: any;
    static view_student_balance: any;
    static pay_student_fee: any;
    static show_student_status: any;

    constructor(){
        this.students = [];
    }

    //method to add new student
    add_student(name: string){
      let Student = new student(name);
      this.students.push(Student);
      console.log(`Student: ${name} added Successfully. Student ID: ${Student.id}`);

    }

    //method for enroll a student in a course
    enroll_student(student_id: number, course: string){
       let student = this.students.find(std => std.id === student_id);
       if (student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} Successfully`);

       }


    }

    //method to view a student balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        }
        else{
            console.log("Student not found. Please enter a correct Student_ID")
        }
    }

    //method to pay student fee
    pay_student_fee(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount);
        }
        else{
            console.log("Student not found. Please enter a correct Student_ID")
        }

    }

    //method for student STATUS display
    show_student_status(student_id: number){
        let student = this.find_student(student_id)
        if (student) {
            student.show_status();
        }

    }

    //method to find a student by student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);

    }

    

}

//main function of program

async function main(){
    console.log("WELCOME IN MY STUDENT MANAGEMENT SYSTEM");
    console.log("-".repeat(40));

    let studentManager = new Students_manager();

    while(true){
        let choice = await inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "Please Select an Option",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Student Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
    ]);

    //choice control by switch case

    switch(choice.choice){
        case "Add Student":
        let name_input = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter a Student Name",
            }
    ]);
    studentManager.add_student(name_input.name);
    break;

    case "Enroll Student":
    let enroll_input = await inquirer.prompt([
        {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",

    },
    {
        name: "course",
        type: "input",
        message: "Enter a Course Name",
    }
]);
studentManager.enroll_student(enroll_input.student_id, enroll_input.course);
break;

case "View Student Balance":
    let balance_input = await inquirer.prompt([
        {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
        }
]);
studentManager.view_student_balance(balance_input.student_id)
break;

case "Pay Fees":
    let fee_input = await inquirer.prompt([
        {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",

    },
    {
        name: "amount",
        type: "number",
        message: "Enter The Amount To Pay ",
    }
]);
    studentManager.pay_student_fee(fee_input.student_id, fee_input.amount);
        break;

        case "Show Status":
            let status_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID",

            }
        ]);
    
        studentManager.show_student_status(status_input.student_id);
        break;

        case "Exit":
            console.log("Exiting...");
            process.exit();

    }
    }   
}

//calling main funtion
main()