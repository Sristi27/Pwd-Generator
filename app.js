const  result=document.getElementById("pwd");
const  length=document.getElementById("pwdLen");
const  upper=document.getElementById("uppercase");
const  lower=document.getElementById("lowercase");
const  num=document.getElementById("numbers");
const  symbol=document.getElementById("symbol");
const  generate=document.getElementById("submit");
const  copy=document.getElementById("clipboard");



const randomFun = {
    haslow : getRandomLower,
    hasupper : getRandomUpper,
    hasnum : getRandomNumber,
    hassymbol : getRandomSymbol
}


generate.addEventListener("click",()=>
{
   const len = length.value;
   const haslow = lower.checked;
   const hasupper = upper.checked;
   const hasnum = num.checked;
   const hassymbol = symbol.checked;

   result.innerHTML = generatePassword(haslow,hasupper,hasnum,hassymbol,len);


})



copy.addEventListener('click',()=>
{
    const textarea=document.createElement('textarea');
    const password=result.innerHTML;
    if(!password) 
    {
        alert("Generate a new password by setting the length!")
    }
    
    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!')
})


function generatePassword(haslow,hasupper,hasnum,hassymbol,len)
{
    let pwd='';

    const cnt= hasnum + hassymbol + hasupper + haslow;
    // console.log(cnt)

    const typeArr = [ {haslow} , {hasupper} , {hasnum} , {hassymbol} ].filter(
        item=>
        
            //remove ones which are not checked
            Object.values(item)[0]
        
    );


    if(cnt===0) return  '';


    for(let i=0;i<len;i+=cnt)
    {
        typeArr.forEach(
            type=>
            {
                const funcName = Object.keys(type)[0];
                pwd+=randomFun[funcName]();
            }
        )
    }


    return pwd.slice(0,len);

}

function getRandomNumber()
{
     return(Math.floor((Math.random()*10)));
}



function getRandomSymbol()
{
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomUpper()
{
    return String.fromCharCode(Math.floor((Math.random()*26)+65));
}

function getRandomLower()
{
    return String.fromCharCode(Math.floor((Math.random()*26)+97));
}