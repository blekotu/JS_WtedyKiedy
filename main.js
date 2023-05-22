

            const slots=[...document.querySelectorAll('.slot')];
            const cards=[...document.querySelectorAll('.karta')];
            const currentQuestion=document.querySelector('.current-question');
            let answer=0;
            let numerPytania=0;
            const card_deck=document.querySelector('.card-deck');


            
            function answer_selection(e) {
                let coto=slots.findIndex(element=>element==this);
                let data_min =0;
                let data_max =0;
                (cards[coto].data)?data_min=cards[coto].data:data_min=-100000;
                (cards[coto+1].data)?data_max=cards[coto+1].data:data_max=100000;
                console.log(data_min);
                console.log(data_max);
                
                console.log(`w lewo wolnych ${cards.slice(0,coto).length}`)
                console.log(`w prawo wolnych ${cards.slice(coto+1).length}`)

                //zajete miejsce
                if (cards[coto].data) {

                } else if (cards[coto+1]) {

                } else {
                    placeCard(coto,numerPytania);
                    //bo było wolne miesjce po lewej
                };

            
                
            }

            function formatQuestion (question) {
                return `<p class="pytanie"> ${question}</p>`;
            };
            
            function formatData(data) {
                return `<p class="data">${data}</p>`;
              }


            function placeCard(boardNumber,question) { //W doklnym rędzie
                const card=cards[boardNumber];
                card.style.visibility="visible";
                card.style.opacity="1";
                card.innerHTML=formatData(pytania[question][0]);
                card.innerHTML+=formatQuestion(pytania[question][1]);
                card.data=pytania[question][0];
                slots.forEach(slot=>slot.style.visibility="hidden")
            }  

            function showSlots () {   //Do klikania pomiedzy umieszczonymi na planszy kartami
                for (let i=0;i<10;i++) {
                    if (cards[i].style.visibility=="visible" || cards[i].style.opacity=="1") {
                        (i>0)?slots[i-1].style.visibility="visible":1;
                        (i<9)?slots[i].style.visibility="visible":1;
                    }
                }
            }
            
            function newQuestion(question) {
                //const numberOfQuestions=pytania.length;
                //const question=Math.floor(Math.random(1)*1007);
                
                currentQuestion.innerHTML=`<p class="current-question-text"
                            >${pytania[question][1]}</p>`;
                
                showSlots();
                numerPytania=question;
                card_deck.style.visibility="hidden"

                //REMOVE AT END
                answer=pytania[question][0];
            }



            placeCard(4,Math.floor(Math.random(1)*pytania.length));
            placeCard(5,Math.floor(Math.random(1)*pytania.length));

            //Watching clicks for open slots between cards
            slots.forEach(karta => karta.addEventListener('click', answer_selection));
            
            //drawing new question
            numerPytania=Math.floor(Math.random(1)*pytania.length);
            
            card_deck.addEventListener('click',newQuestion(numerPytania));

            


            

            
          
            // sloty[2].style.visibility="visible";
            // sloty[3].style.visibility="visible";
           
            
            // karty[4].innerHTML=formatData(pytania[1][0]);
            
            // karty[4].innerHTML+=formatQuestion(pytania[1][1])
       