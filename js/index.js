var game={
    //父元素
    el:" ",
    start:" ",
    button:" ",
    // 游戏的级别
    level:0,
    blocks:0,
    // 给游戏设置宽高
    gamesWeight:600,
    gamesHeight:600,
    // 创建图片的数组的 
    // picArr:[],
    // 牌的总数量
    picNum:20,
    // musicNum:16,
    // 存放牌的信息
    dataArr:[],
    // 存放音乐的信息
    musicArr:[],
    // 判断数组，存放被翻牌的信息
    judeArr:[],
    blocksArr:[],
    opicArr:[],
    turnNum:0,
    obj:{},
    oblocks:" ",
    otcp:" ",
    dom:" ",

    // 初始化
    init:function(opaction){
        this.obj=opaction;
        this.initData(this.obj)
        this.handel()
        this.rander()
        // this.createMusic()
        this.startButton(this.obj)
    },
    startButton:function(opaction){
        var start =opaction.start
        var button=opaction.button
        button.onclick=function(){
            // console.log("jj")
            start.style.display="none"
        }
        
    },
    //初始化数据的  
    initData:function(opaction){
        this.el=opaction.el
        this.level=opaction.level
        // 因为如果是一级的话就是四个格子，二级的话16个，三级的话32个
        this.blocks=(this.level*2)*(this.level*2)
        this.getArr()
    },        
    // 创建托数组函数的 
    getArr:function() {
        // 获取到数组
        var random=this.randomArr()
        var halfBlocks=this.blocks/2
        var dataArr=[]
        for(var i=0;i<halfBlocks;i++){
            var num=random[i]
            var info={
                url:"./images/"+num+".png",
                id:num,
                src:"./audios/"+num+".ogv"
            }
            dataArr.push(info,info)
        }
        // 这里要洗牌的意义就是要洗牌！！
        this.dataArr=this.shuffle(dataArr)
        
    },
    // // 创建音乐
    // createMusic:function(){

    // },
    randomArr:function () {
        var picNum=this.picNum
        var arr=[]
        for(var i=0;i<picNum;i++){
            // 把1-20这些数都存到数组中
            arr.push(i+1)
        }
        // 在图片里随机抽取
        return this.shuffle(arr)
    }
    ,shuffle:function (arr) {
        // 洗牌
        return arr.sort(function () {
            return 0.5-Math.random()
        })
    }
    //渲染元素
    ,rander:function(){
        var blocks=this.blocks
        var gamesHeight=this.gamesHeight
        var gamesWeight=this.gamesWeight
        var level=this.level
        // 方块的宽和高
        var blockWight=gamesWeight/(level*2)
        var blockHeight=gamesHeight/(level*2)
        var dataArr=this.dataArr
        // console.log(dataArr)
        for(var i=0;i<blocks;i++){
            var info=dataArr[i]
            var oblocks=document.createElement("div")
            var opic=document.createElement("div")
            var audios=document.createElement("audio")
            game.oblocks=oblocks
            game.otcp=opic
            // console.log(game.oblocks)
            // opic.style.backgroundImage="url(../images/"+picArr[i]+".png)";
            audios.src=info.src
            opic.style.backgroundImage='url(' + info.url + ')'
            oblocks.style.width=blockWight+"px"
            oblocks.style.height=blockHeight+"px"
            opic.setAttribute("class","pic")
            audios.setAttribute("class","music")
            oblocks.picId=info.id
            oblocks.setAttribute("class","block")
            oblocks.appendChild(opic)
            this.el.appendChild(oblocks)
            oblocks.appendChild(audios)
            game.blocksArr.push(oblocks)
            game.opicArr.push(opic)
            game.musicArr.push(audios)
            
        }
        console.log(game.blocksArr)
    },

    // 事件的
    handel:function(){
        var self=this
        // 监听父元素的点击事件
        this.el.onclick=function (e) { 
            console.log(e.target)
            self.dom=e.target
            // if(self.dom==)
            // console.log(self.dom.lastChild)
            console.log(self.dom)
            
            // console.log(dom)
            // 查看元素中是否有block
            var isBlock=self.dom.classList.contains("block")
            if(isBlock){
                self.handelBlock(self.dom)
            }
         }
    }
    ,handelBlock:function(dom){
        var isMusic=dom.lastChild.classList.contains("music")
            if(isMusic){
                dom.lastChild.play()
            }
        // 添加类名，让图片反转
        var picId=dom.picId
        // console.log(picId)
        var judeArr=this.judeArr
        var judeArrLength=judeArr.push({
            id:picId,
            dom:dom
        })
        // console.log(judeArrLength)
        dom.classList.add("on")
        if(judeArrLength===2){
            this.judePic()
        }
        this.judeWin()
    },
    // 判断是否相同
    judePic:function(){
        var judeArr=this.judeArr
        var isSamePic1=judeArr[0].id
        var isSamePic2=judeArr[1].id
        // 如果相同的话
        if(isSamePic1===isSamePic2){
            // 数字就加上2
            this.turnNum+=2
        }else{
            var picDom1=judeArr[0].dom
            var picDom2=judeArr[1].dom
                // 设置个定时器让他反转回去
                setTimeout(function(){
                    picDom1.classList.remove("on")
                    picDom2.classList.remove("on")

                },500)
        }
        judeArr.length=0
    },
    judeWin:function(){
        if(this.turnNum===this.blocks){
            setTimeout(function(){
                // alert("胜利")
                // game.level++
                // game.obj.level++
                game.isWin()
            },300)
        }
    },
    isWin:function(){
        alert("胜利~进入下一关")
        game.removeData()
     }, 
    //  删除页面上的所有的数据
     removeData:function(){
        for(var i=0;i<game.blocks;i++){
            game.obj.el.removeChild(game.blocksArr[i])
        }
        game.blocks=0
        game.turnNum=0
        console.log(game.blocks)
        console.log(game.turnNum)
        game.blocksArr=[]
        game.obj.level++
        if(game.obj.level>3){
            alert("恭喜你已经通关啦！！(其实是因为不想继续往下玩测bug了...)")
            window.location.reload()
        }
        game.init(game.obj)
        // console.log(game.turnNum)
        // console.log(game.blocks)
     }

}
game.init({
    el: document.getElementById("game"),
    start:document.getElementById("start"),
    button:document.getElementById("button"),
    level:1

})