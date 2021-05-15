let puppeteer=require("puppeteer");
let fs=require("fs");
const util=require('util');
let userName="nopeu37";
let password="nope@123";
let search="creative_arts_121";



(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });

    let pages=await browser.pages();
    let tab=pages[0];
    await tab.goto("https://www.instagram.com/");
    await tab.waitForTimeout("2000");
    await tab.type("input[name='username']",userName);
    await tab.type("input[name='password']",password);
    await tab.click(".sqdOP.L3NKy.y3zKF");
    await tab.waitForTimeout("2000");

    await Promise.all([
        tab.waitForNavigation({waitUntil:"networkidle2"}),
    ]);

    await tab.click(".sqdOP.yWX7d.y3zKF");
    await tab.waitForSelector(".aOOlW.HoLwm");
    await tab.click(".aOOlW.HoLwm");
    await tab.type(".XTCLo.x3qfX",search);
    await tab.waitForSelector(".uo5MA._2ciX.tWgj8.XWrBI",{visible:true});
    await tab.waitForSelector(".-qQT3",{visible:true});
    await tab.click(".-qQT3");

    await Promise.all([
        tab.waitForNavigation({waitUntil:"networkidle2"}),
    ]);

    await tab.click("._5f5mN.jIbKX._6VtSN.yZn4P");
    let element=await tab.evaluate(()=>{
        let ele=Number(document.querySelector(".g47SY").textContent);
        return ele;
    });

    await Promise.all([
        tab.waitForNavigation({waitUntil:"networkidle2"}),
        tab.click(".eLAPa")
    ]);

    await tab.waitForSelector(".QBdPU>span>svg[aria-label]",{visible:true});
    let button=await tab.evaluate(()=>{
        let ele=document.querySelector(".QBdPU>span>svg[aria-label]").getAttribute("aria-label");
        return ele;
    });

    for(let i=1;i<=element;i++){
        await tab.waitForSelector(".fr66n .wpO6b",{visible:true});
        if(button==="Like"){
            await tab.evaluate(()=>{
                document.querySelector(".fr66n .wpO6b").click();
            });
        }
        if(i!=element){
            await Promise.all([
                tab.waitForNavigation({waitUntil:"networkidle2"}),
                tab.click("._65Bje.coreSpriteRightPaginationArrow")
            ]);
        }
    }

    await tab.click(".Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG>button");
    // console.log(element);
    let followers=await tab.evaluate(()=>{
        let foll=document.querySelectorAll(".g47SY");
        foll[1].click();
        let fol=Number(foll[1].textContent);
        return fol;
    });
    // console.log(followers);

    await tab.waitForTimeout("3000");
    await tab.evaluate(()=>{
        let al=document.querySelectorAll("._7UhW9.xLCgt.MMzan._0PwGv.fDxYl");
        al[al.length-1].scrollIntoView();
    })

    await tab.waitForSelector(".wFPL8",{visible:true});
    let time1=await new Promise(function(resolve,reject){
        var timer=setInterval(async function(){
            let length=await tab.evaluate(()=>{
                let al=document.querySelectorAll(".wFPL8");
                al[al.length-1].scrollIntoView();
                return al.length;
            });
            if(length==followers){
                clearInterval(timer);
                resolve();
            }
            // console.log(length);
        },3000);
    });

    await tab.waitForTimeout("3000");
    let followersArray=await tab.$$eval(".wFPL8",followersArray=>{
        return followersArray.map((div)=>div.textContent)
    });
    // console.log(util.inspect(followersArray,{maxArrayLength:null}));

    await tab.click(".eiUFA .wpO6b");

    let following=await tab.evaluate(()=>{
        let foll=document.querySelectorAll(".g47SY");
        foll[foll.length-1].click();
        let fol=Number(foll[foll.length-1].textContent);
        return fol;
    });
    // console.log(following);

    await tab.waitForTimeout("3000");
    await tab.evaluate(()=>{
        let al=document.querySelectorAll("._7UhW9.xLCgt.MMzan._0PwGv.fDxYl");
        al[al.length-1].scrollIntoView();
    });

    await tab.waitForSelector(".wFPL8",{visible:true});
    let time2=await new Promise(function(resolve,reject){
        var timer=setInterval(async function(){
            let length=await tab.evaluate(()=>{
                let al=document.querySelectorAll(".wFPL8");
                al[al.length-1].scrollIntoView();
                return al.length;
            });
            if(length==following){
                clearInterval(timer);
                resolve();
            }
            // console.log(length);
        },3000);
    });
    
    await tab.waitForTimeout("3000");
    let followingArray=await tab.$$eval(".wFPL8",followingArray=>{
        return followingArray.map((div)=>div.textContent)
    });
    // console.log(util.inspect(followingArray,{maxArrayLength:null}));

    await tab.click(".eiUFA .wpO6b");

    await tab.evaluate(()=>{
        let a=document.querySelectorAll("._9VEo1");
        a[a.length-1].click();
    });
    
    await tab.waitForSelector(".eLAPa",{visible:true});
    let taggedCount=await tab.evaluate(()=>{
        let b=document.querySelectorAll(".eLAPa");
        return b.length;
    });
 
    let diff1=followersArray.filter(x => !followingArray.includes(x));
    // console.log(util.inspect(diff1,{maxArrayLength:null}));

    let diff2=followingArray.filter(x => !followersArray.includes(x));
    // console.log(util.inspect(diff2,{maxArrayLength:null}));

    let ans=`Total Post: ${element} \n`;
    let ans1=`Followers Count: ${followers} \n`;
    let ans2=`Following Count: ${following} \n`;
    let ss=`Tagged in ${taggedCount} posts \n` ;
    let str1="Followers List: \n";
    let str2="Following List: \n";
    let str3=`List of users who is not followed by ${search}: \n`;
    let str4=`List of users who don't follow ${search}: \n`;

    for(let x in followersArray){
        str1+=followersArray[x].toString()+"\n";
    }
    str1+="\n\n";

    for(let x in followingArray){
        str2+=followingArray[x].toString()+"\n";
    }
    str2+="\n\n";

    for(let x in diff1){
        str3+=diff1[x].toString()+"\n";
    }
    str3+="\n\n";

    for(let x in diff2){
        str4+=diff2[x].toString()+"\n";
    }

    if(fs.existsSync(`${search}.txt`)){
        fs.writeFileSync("updated.txt",search+"\n");
        fs.appendFileSync("updated.txt",ans+"\n");
        fs.appendFileSync("updated.txt",ans1+"\n");
        fs.appendFileSync("updated.txt",ans2+"\n");
        fs.appendFileSync("updated.txt",ss+"\n");
        fs.appendFileSync("updated.txt",str1);
        fs.appendFileSync("updated.txt",str2);
        fs.appendFileSync("updated.txt",str3);
        fs.appendFileSync("updated.txt",str4);
    }else{
        fs.writeFileSync(`${search}.txt`,search+"\n");
        fs.appendFileSync(`${search}.txt`,ans+"\n");
        fs.appendFileSync(`${search}.txt`,ans1+"\n");
        fs.appendFileSync(`${search}.txt`,ans2+"\n");
        fs.appendFileSync(`${search}.txt`,ss+"\n");
        fs.appendFileSync(`${search}.txt`,str1);
        fs.appendFileSync(`${search}.txt`,str2);
        fs.appendFileSync(`${search}.txt`,str3);
        fs.appendFileSync(`${search}.txt`,str4);
    }
})();




