var basicCard = require("./BasicCard");
var clozeCard = require("./ClozeCard");
var inquire = require("inquirer")
var fs = require("fs");

var input = process.argv[2];
// var input2 = process.argv[3];

var review = function(){
			var basicOrCloze = Math.random()*2 > 1 ? true : false
				if(basicOrCloze){
				// var getCard = [];
					fs.readFile("./basicCards.txt","utf8", function(err, text){
					    getCard = text.split("\n")
					 	var rand = JSON.parse(getCard[Math.floor(Math.random() * getCard.length)]);
					 	let frontCardPromise = () => new Promise((resolve, reject) => {
					 		resolve(console.log(rand.front));
					 	})
					 	frontCardPromise().then(() => {
						let frontTimer = setTimeout(() => {
						console.log(rand.back);
						review();
						}, 5000)
					 		
					 	})


					});
				}
				else{
					fs.readFile("./clozeCards.txt","utf8", function(err, text){
					    getCard = text.split("\n")
					 	var rand = JSON.parse(getCard[Math.floor(Math.random() * getCard.length)]);
						// console.log(rand.partial);

						let frontCardPromise = () => new Promise((resolve, reject) => {
					 		resolve(console.log(rand.partial));
					 	})
					 	frontCardPromise().then(() => {
						let frontTimer = setTimeout(() => {
						console.log(rand.fullText);
						review();
						}, 5000)
					 		
					 	})
					})
				};
			}

inquire
.prompt([
{
	name: "playCreate",
	type: "list",
	message: "Do you want to make or review?",
	choices: ["Make New FlashCard", "Review Flash Cards"]
}])
.then(function (answers){
	if(answers.playCreate == "Review Flash Cards"){
		review();
	}
// })

	else if(answers.playCreate == "Make New FlashCard"){
		inquire
		.prompt([
		{name: "typeOfCard",
		type: "list",
		message: "Which Type of Card would you like to create?",
		choices: ["Basic Card", "Cloze Card"]
		}
		])
		.then(function(answers){
			if(answers.typeOfCard === "Basic Card"){
				inquire.prompt([{
					name:"front",
					type: "input",
					message: "Write the front of your Flash Card."
				},
				{
					name: "back",
					type: "input",
					message:"Write the back of your Flash Card."
				}
				])
				.then(function(answers){
					// console.log(answers.front)
					var basic = new basicCard(answers.front, answers.back);
					console.log(basic.front);
					fs.appendFile("BasicCards.txt", JSON.stringify(basic+"\n"), function (err) {
					  if (err) throw err;
					  console.log('Saved!');
					})
				})
			}
			else if(answers.typeOfCard === "Cloze Card"){
				inquire.prompt([{
					name:"text",
					type: "input",
					message: "Write the full text of your Flash Card."
				},
				{
					name: "cloze",
					type: "input",
					message:"Write the removed portion of your Flash Card."
				}
				])
				.then(function(answers){
					// console.log(answers.front)
					var cloze = new clozeCard(answers.text, answers.cloze);
					console.log(cloze.fullText);
					fs.appendFile("ClozeCards.txt", JSON.stringify(cloze)+"\n", function (err) {
					  if (err) throw err;
					  console.log('Saved!');
					})
				})
			}
		})
	}
})
