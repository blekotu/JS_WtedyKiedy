


            const slots=[...document.querySelectorAll('.slot')];
            const cards=[...document.querySelectorAll('.karta')];
            const scores=document.querySelector('.score');
            const currentQuestion=document.querySelector('.current-question');
            let answer=0;
            let numerPytania=0;
            const card_deck=document.querySelector('.card-deck');
            let correctAnswers=1;
            let allQuestions=1;
            let pytania=pytania_all;
            let failmessage="";
            let language="PL";
            
            displayLanguages();
            changeLanguage(language);


            //chyba nie potrzebne
            const questionCategories = [...new Set(pytania.map(pytanie=>pytanie[2]))]





        function changeLanguage(language){
            const klawisze=document.querySelectorAll('.language');
            klawisze.forEach(e=>(e.classList.contains(language))?e.classList.add("langSelected"):e.classList.remove("langSelected"))
                // {
                //     e.classList.remove("langSelected")})
            
            // const klawisz=document.querySelector(`.${language}`)
            // klawisz.classList.add("langSelected")
            
              

            if (language=="ENG") {
                pytania=pytania_all_en;
                currentQuestion.innerHTML=`<p class="current-question-text"
                            >${pytania[numerPytania][1]}</p>`;
                failmessage="Wrong answer! It was on ";
            } else {
                language="PL"
                pytania=pytania_all;
                currentQuestion.innerHTML=`<p class="current-question-text"
                            >${pytania[numerPytania][1]}</p>`;
                failmessage="Zła odpowiedź! To miało miejsce w ";
            }
        }


        // function CategoryChange() {
            
        //     if (!currentQuestion.innerHTML) {            
        //     const checkboxy = document.querySelectorAll('.card-deck input ');
        //     const choosen=[];
        //     checkboxy.forEach(boxik=>(boxik.checked)?choosen.push(boxik.name):1)
        //     changeLanguage(language)  //to refresh whole questions table
        //     pytania.filter(rekord=>choosen.includes(rekord[2]));
        //     }
            
        // }
    
        // function categories () {
            
        //     response="<form>"
        //     questionCategories.forEach(cat=>response+=`<input type="checkbox" id="cat-${cat}" name="${cat}" 
        //             checked onchange="CategoryChange()">
        //             <label id ="cat-${cat}">${cat}</label><br />`);
        //     response+="</form>"
        //     card_deck.innerHTML=response;
        // }    

        function displayLanguages() {
            let html;
            html=`<input class="language PL"  type="button" onclick="changeLanguage('PL')" value="PL">`;
            html+=`<input class="language ENG" type="button" onclick="changeLanguage('ENG')" value="ENG">`;
  
            card_deck.innerHTML=html;
        };        


        function printScores () {
                results=`<p> Correctly Answered : ${correctAnswers}</p>`;
                results+=`<p> All questions : ${allQuestions}</p>`;
               
               results+=`<p> Your efficiency : ${(correctAnswers/allQuestions).toFixed(2)*100}%</p>`
                scores.innerHTML=results;
            }



        function shiftCardsLeft(start) {
            
            for (let i=1;i<start+1;i++) {
                cards[i-1].innerHTML=cards[i].innerHTML;
                cards[i-1].data=cards[i].data;
            if (cards[i-1].data) {
                cards[i-1].style.visibility="visible";
                cards[i-1].style.opacity="1";
            }
        }
        }

        function shiftCardsRight(start) {
            for (let i=8;i>start;i--) {
                cards[i+1].innerHTML=cards[i].innerHTML;
                cards[i+1].data=cards[i].data;
            if (cards[i+1].data) {
                cards[i+1].style.visibility="visible";
                cards[i+1].style.opacity="1";
            }
        }
        }

        function answer_selection(e) {
            let coto=slots.findIndex(element=>element==this);
            let data_min =0;
            let data_max =0;
            coto=coto-1;
            //bo logike zrobilem na mniejsz ilos slotow
            
            //Okreslanie granicznych dat po obu stronach zaznaczonego slotu
            if (coto>-1) {
            (cards[coto].data)?data_min=cards[coto].data:data_min=-100000;
            } else {
                //skrajny po lewej
                data_min=-100000;
            }
            if (coto<10) {
            (cards[coto+1].data)?data_max=cards[coto+1].data:data_max=100000;
            } else {
                //skrajny po prawej
                data_max=100000;
            }
            
            if (pytania[numerPytania][0]>=data_min && pytania[numerPytania][0]<=data_max) {
                
                //Poprawna odpowiedz
                correctAnswers+=1;
                printScores();

                if (cards[coto] && !cards[coto].data && cards[coto+1].data>=pytania[numerPytania][0]) {
                    placeCard(coto,numerPytania);
                    //dobra odp i pusto po lewo i nie ostatni slot zajety
                } else if (cards[coto+1] && !cards[coto+1].data && cards[coto].data<=pytania[numerPytania][0]) {
                    placeCard(coto+1,numerPytania);
                    //dobra odpowiedz i pusto po prawo i nie ostatni slot zajety
                } else {
                    //sprawdz w ktora strone przesunac karty - gdzie wiecej wolnych slotow
                    if (cards.slice(0,coto).length>cards.slice(coto+1).length) {
                        //przesuwaj w lewo bo tam wiecej wolnych slotow 
                            shiftCardsLeft(coto)
                            placeCard(coto,numerPytania);
                         } else {
                        //skoro nie w lewo to przesun w prawo
                            shiftCardsRight(coto);
                            placeCard(coto+1,numerPytania);
                        }
                    }
            } else {
                //Wrong Answer!
                alert( `${failmessage} ${pytania[numerPytania][0]}`)
                slots.forEach(slot=>slot.style.visibility="hidden")
            }
            //W kazdym prypadku wyczyscic pytanie, pokazac talie do losowani i wlaczyc sluchacza;
                currentQuestion.innerHTML="";
                currentQuestion.addEventListener('click',newQuestion);
                currentQuestion.classList.add('clickable');
            // i usun pytanie ze stosu, niestety do zmiany jezyka
                pytania.filter(rekord=>rekord[0]!=numerPytania);

            }


            function formatQuestion (question) {
                return `<p class="pytanie"> ${question}</p>`;
            };
            
            function formatData(data) {
                let result="";
                (data<0)?result=`${(Math.abs(data))} BC`:result=data;
                return `<p class="data">${result}</p>`;
              }


            function placeCard(boardNumber,question) { 
                //after correct answer reviel opacity and visibility
                const card=cards[boardNumber];
                card.style.visibility="visible";
                card.style.opacity="1";
                card.innerHTML=formatData(pytania[question][0]);
                card.innerHTML+=formatQuestion(pytania[question][1]);
                card.data=pytania[question][0];
                slots.forEach(slot=>slot.style.visibility="hidden")
            }  

            function showSlots () {   //Show clickable slots between activ cards
                for (let i=0;i<10;i++) {
                    if (cards[i].style.visibility=="visible" || cards[i].style.opacity=="1") {
                        (i>=0)?slots[i].style.visibility="visible":1;
                        (i<=9)?slots[i+1].style.visibility="visible":1;

                    }
                }
                
               
            }
            
            function newQuestion() {
              
                const numberOfQuestions=pytania.length; //total number of questions
                const question=Math.floor(Math.random(1)*numberOfQuestions);
                
                
                numerPytania=question;
                currentQuestion.innerHTML=`<p class="current-question-text"
                            >${pytania[numerPytania][1]}</p>`;
                
                showSlots();
                
                
                currentQuestion.removeEventListener('click',newQuestion);
                currentQuestion.classList.remove('clickable');

                //card_deck.style.visibility="hidden"
                allQuestions+=1;
                printScores();
                //REMOVE AT END
                answer=pytania[numerPytania][0];
            }


            //Kategorie
            //categories();
            
            //placing first Card on board and removing from pile
            numerPytania=Math.floor(Math.random(1)*pytania.length)
            placeCard(4,numerPytania);
            pytania.filter(rekord=>rekord[0]!=numerPytania);
                                
            //drawing first question
            newQuestion();
        


            //Watching clicks for open slots between cards
            slots.forEach(karta => karta.addEventListener('click', answer_selection));





            //card_deck.addEventListener('click',newQuestion(numerPytania));


       