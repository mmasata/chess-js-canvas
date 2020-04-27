export class ChessmanModalChooser{
        static chessman = null;
        static init = false;

        constructor(){

        }

        static showModal(chessman){
                ChessmanModalChooser.chessman = chessman;
                let modal = document.getElementById('chooseNewChessman');
                modal.style.display = "block";
                if(!ChessmanModalChooser.init){
                        let elements = document.getElementsByClassName('choose-btn');
                        for(let el of elements){
                                el.addEventListener('click' , (e)=>{
                                        ChessmanModalChooser.returnNewChessmanType(el.innerHTML);
                                });
                        }
                        ChessmanModalChooser.init = true;
                }
        }

        static returnNewChessmanType(type){
                ChessmanModalChooser.chessman.becameNewType(type);
                ChessmanModalChooser.chessman = null;
                ChessmanModalChooser.hideModal();
        }

        static hideModal(){
                let modal = document.getElementById('chooseNewChessman');
                modal.style.display = "none";   
        }
}