function ClozeCard(text, cloze){
	if(text.includes(cloze) == false){
		console.log("The cloze must be included in the text.")
		return
	}
	else{
	this.cloze = cloze;
	this.fullText = text
	this.partial = this.fullText.replace(this.cloze, "... ");
	}

}

module.exports = ClozeCard