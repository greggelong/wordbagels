
let button, input, output;

let maxdigit =3;

let maxcount = 10;

let guessNum = 0;

let computerSecret;
let win = false;

let wordlist = ["cat", "dog", "hat", "bat", "sat", "house"]
let wordlist2 = ["ass","ours", "tie", "row", "pool", "bell", "absent", "secondary"]
let lettout = [];
function setup(){
  noCanvas();
  input = select('#input');
  input.value(' ');
  button = select('#btn');
  output = select('#output');
  button.mousePressed(goguess)
  computerSecret = getWord();
  console.log(computerSecret);
  output.html("I have a "+computerSecret.length+" letter word")



}

function goguess(){
  guessNum ++; 
  // need to clean the input with trim() or it wont work
  // and only do guesses under these conditions 
  if (guessNum < 11 && !win){
  let cmpReply = getClues(input.value().trim(),computerSecret);
  
  output.html(cmpReply)

  let history = "Guess "+ guessNum + " " + input.value() + " " + cmpReply 

  createP(history);

  input.value(' ')
    } else if (guessNum >= 11 && !win){
      output.html("Too many guesses!!!, my word was "+computerSecret +" Refresh to play again!")

    }else{

  output.html("Refresh the page to play again!")
  }
}



function getSecNun(){
  let nums = [0,1,2,3,4,5,6,7,8,9]
  print(nums);
  let result = "";
  for (let i = 0; i< maxdigit;i++){
    let pick =floor(random(nums.length)); // need to keep changing the array size 
    result = result+ nums.splice(pick,1)  // need to take out the numbers already picked
    print(result, pick, nums)
  }
  return result
}


function getWord(){
  
  let result = wordlist2[floor(random(wordlist.length))]
  return result
}

function getClues(guess,secret){
  if(guess === secret){
    win = true;
    return 'You got it!!! *Refresh the page to play again*'
  }else if(guess !== secret && guessNum == 10){
    return "Too many guesses!!!, my number was "+computerSecret +" Refresh to play again!"
  }
  let ga = guess.split('');
  let sa = secret.split('');
  //print(ga,sa)
  // fixed :this logic has a problem with double letters at end of word see example bell amd ass
  // fixed the logic by comparing the secret to the gess at each index
  let reply = [];
  let clue ="";
  for(let i=0;i<guess.length;i++){
    //if(sa.indexOf(ga[i]) === i){
    if(sa[i]=== ga[i]){
      reply.push("fermi");
      clue += sa[i];
    } else if(sa.includes(ga[i])){
      reply.push("pico");
      clue += "*"
    } else{
      clue+="-"
      if (!lettout.includes(ga[i])){
      lettout.push(ga[i])
      }
    }
    //clue+="_"
  }
  console.log(clue)
  createP(clue+" : no :"+lettout)
  if(reply.length == 0){
    return "bagels"
  } else{
      //reply.sort(()=> Math.random() - 0.5)
      return reply.join(', ')
  }

}



/*
need to fix the logic for double letters
clues


You got it!!! *Refresh the page to play again*

---- : no :c,a,r,s

Guess 1 cars bagels

---- : no :c,a,r,s,p,o,n,t

Guess 2 pont bagels

---- : no :c,a,r,s,p,o,n,t,m,i,h,u

Guess 3 mihu bagels

be*- : no :c,a,r,s,p,o,n,t,m,i,h,u,f

Guess 4 beef fermi, fermi, pico

Guess 5 bell You got it!!! *Refresh the page to play again*

*/
