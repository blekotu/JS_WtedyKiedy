

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
                
            if (pytania[numerPytania][0]>=data_min && pytania[numerPytania][0]<=data_max) {

               
                if (!cards[coto].data && cards[coto+1].data>=pytania[numerPytania][0]) {
                    placeCard(coto,numerPytania);
                    //dobra odp i pusto po lewo i nie ostatni slot zajety
                } else if (!cards[coto+1].data && cards[coto].data<=pytania[numerPytania][0]) {
                    placeCard(coto+1,numerPytania);
                    //dobra odpowiedz i pusto po prawo i nie ostatni slot zajety
                } else {
                    //sprawdz w ktora strone przesunac karty - gdzie wiecej wolnych slotow
                    if (cards.slice(0,coto).length>cards.slice(coto+1).length) {
                        //przesuwaj w lewo bo tam wiecej wolnych slotow 
                            console.log('w lewo')
                            for (let i=1;i<coto+1;i++) {
                                    cards[i-1].innerHTML=cards[i].innerHTML;
                                    cards[i-1].data=cards[i].data;
                                if (cards[i-1].data) {
                                    cards[i-1].style.visibility="visible";
                                    cards[i-1].style.opacity="1";
                                }
                            }
                            placeCard(coto,numerPytania);
                         } else {
                        //skoro nie w lewo to przesun w prawo
                            console.log('w prawo')
                            for (let i=8;i>coto;i--) {
                                    cards[i+1].innerHTML=cards[i].innerHTML;
                                    cards[i+1].data=cards[i].data;
                                if (cards[i+1].data) {
                                    cards[i+1].style.visibility="visible";
                                    cards[i+1].style.opacity="1";
                                }
                            }
                            placeCard(coto+1,numerPytania);
                        }
                    
                    
                }


            } else {
                alert('zla dopowiedz')

                slots.forEach(slot=>slot.style.visibility="hidden")
            }
                

                currentQuestion.innerHTML="";
                card_deck.style.visibility="visible";
                card_deck.addEventListener('click',newQuestion);
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
                        (i<10)?slots[i].style.visibility="visible":1;
                    }
                }
                
               
            }
            
            function newQuestion() {
                const numberOfQuestions=pytania.length;
                const question=Math.floor(Math.random(1)*numberOfQuestions);
                
                currentQuestion.innerHTML=`<p class="current-question-text"
                            >${pytania[question][1]}</p>`;
                
                showSlots();
                numerPytania=question;
                card_deck.style.visibility="hidden"

                //REMOVE AT END
                answer=pytania[question][0];
            }



            placeCard(4,Math.floor(Math.random(1)*pytania.length));
          


            //Watching clicks for open slots between cards
            slots.forEach(karta => karta.addEventListener('click', answer_selection));
            
            //drawing new question
            numerPytania=Math.floor(Math.random(1)*pytania.length);
            
            card_deck.addEventListener('click',newQuestion(numerPytania));


       