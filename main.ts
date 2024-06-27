#! /usr/bin/env node
import inquirer from "inquirer"
console.log("*****code-with-kinza-My-Bank-console-App*****");


//Bank Account Interface
interface BankAccount {
    accountNumber: number
    balance: number
    withdraw(amount: number): void
    deposit(amount: number): void
    cheakBalance(): void


}
//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number
    balance: number;
    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance

    }
//Debit Mony
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount
        console.log(`withdrawal of $${amount} successful. remaining balance : $${this.balance}`);
    }else{
        console.log("Insufficient balance.");
        
    }
}
// credit mony
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1 //

    }this.balance += amount
    console.log(`Deposit of $${amount} successful. Remaining balance $${this.balance}`);
    
    
}
// check balance
checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
    
}
}
//coustomer class
class Customer{
    firstName: string
    lastName: string
    gender: string
    age: number
    mobileNumber: number
    account: BankAccount
    constructor(firstNumber:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount )
    {
        this.firstName = firstNumber
        this.lastName =lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account


    }

}

//create bank account
const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
]
//create customers
const customers: Customer[] = [
    new Customer ("humza", "syed", "male", 35 , 3214576523 , accounts[0]),
    new Customer ("kinza", "sheikh", "female", 25 , 3214769456 , accounts[1]),
    new Customer ("haniya", "syed", "female", 34 , 3219845654 , accounts[2])
]
// function to interact with bank account
async function service (){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your Account Number"

        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Desposit", "Withdraw", "Chek Balance", "Exit"]

            }]);
            switch(ans.select){
                case "Desposit" :
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break
                    case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                    case "Chek Balance":
                        customer.account.checkBalance()
                        break;
                    case "Exit" :
                        console.log("Exiting bank program....");
                        console.log("\nthank you for using bank services. Have a great day!");
                        return;
                        
                        

            }

        }else{
            console.log("Invalid account number. please tray again");
            
        }

    }while(true)
}
service()

