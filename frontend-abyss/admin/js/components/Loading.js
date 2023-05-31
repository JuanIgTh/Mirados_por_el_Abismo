export default class Loading {

    constructor(id, message){
        this.id=id;
        this.message=message;
        this.setMessage(message);
        this.close();
    }

    open(){
        document.getElementById(this.id).style.display="flex";
    }

    close(){
        document.getElementById(this.id).style.display="none";
    }

    setMessage(msg){
        document.querySelector(`#${this.id} p`).textContent=this.message;
    }

}