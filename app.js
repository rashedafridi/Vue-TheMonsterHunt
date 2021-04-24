function hendelShack(element){
    if(element === 'hero' )
    {   console.log('hero')
        document.getElementById('hero').classList.add('shake')
        setTimeout(() => {
            document.getElementById('hero').classList.remove('shake')
            console.log('hero remove')
        }, 100);
    }
    else{
        document.getElementById('monster').classList.add('shake')
        setTimeout(() => {
            document.getElementById('monster').classList.remove('shake')
        }, 100);
    }
}
function rendomattuckValue(lowerLimit,UperLimit)
{
    return Math.floor(Math.random() * (UperLimit - lowerLimit)) + lowerLimit;  
}
const app = Vue.createApp({
    data(){
        return{
            winner: null,
            HeroHealt:100,
            monsterHealt:100,
            currentRound:0,
            logMassage:[],

        }
    },
    computed:{
        monsterBarStyle(){
            if (this.monsterHealt <= 0)
            {
                return {width: '0'+'%'}
            }
            return {width: this.monsterHealt+'%'}
        },
        heroBarStyle(){
            if (this.HeroHealt <= 0)
            {
                return {width: '0'+'%'}
            }
            return {width: this.HeroHealt+'%'}
        },
        canHeroUseSpassalAttuck(){
            return this.currentRound % 4 !== 0
        }
    },
    methods:{
        heroAttackMonster(){
            const attackValue= rendomattuckValue(2,10)
            this.monsterHealt -= attackValue
            this.addLog('hero' ,'Attack',attackValue)
            this.currentRound++
            hendelShack('monster')
            
            this.monsterAttackHero()
            
            
        },
        monsterAttackHero(){
            const attackValue= rendomattuckValue(6,15)
            this.HeroHealt -= attackValue
            hendelShack('hero')
            this.addLog('monster' ,'Attack',attackValue)
        },
        specialAttackMonster(){
            this.currentRound++
            const attackValue= rendomattuckValue(8,20)
            this.monsterHealt -= attackValue
            hendelShack('monster')
            this.addLog('hero' ,'specialAttack',attackValue)
           

        },
        healHero() {
            this.currentRound++;
            const healValue = rendomattuckValue(8, 20);
            if (this.HeroHealt + healValue > 100) {
              this.HeroHealt = 100;
            } else {
              this.HeroHealt += healValue;
            }
            this.addLog('hero' ,'heal',healValue)
            this.monsterAttackHero();

        },
        herosSurrender() {
            this.winner = 'monster';
          },
          startTheGame(){
            this.monsterHealt= 100;
            this.HeroHealt= 100;
            this.winner = null;
            this.currentRound = 0;
            this.addLog('----' ,'----','----')
          },
          addLog(who ,what, value){
            this.logMassage.unshift({
                who: who ,
                what: what,
                value: value,

            })
          }

    },
    watch:{
        monsterHealt(value)
        {
            if (value <= 0 && this.HeroHealt <= 0) {
                // A draw
                this.winner = 'draw';
              } else if (value <= 0) {
                // Monster lost
                this.winner = 'player';
              }
        },
        HeroHealt(value){

            if (value <= 0 && this.monsterHealt <= 0) {
                // A draw
                this.winner = 'draw';
              } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
              }
        }
    }
})
app.mount('#game');