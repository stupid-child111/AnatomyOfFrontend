# Action
- 1.actio是一个平面对象
    - 它的__proto__指向Object.ptototype
- 2.通常使用payload表示附加数据(如果有)
- 3.action中必须有type属性,用于描述操作
    - 对type的类型没有要求
- 4.在大型项目,由于操作类型较多,为避免硬编码(类似 "increase"),单独存放action文件
- 5.为了传递action,可以使用action创建函数(action creator)来创建action
    - action 创建函数应为无副作用的纯函数
       - 不能以任何形式改动参数
       - 不可以有异步
       - 不可以对外部环境的数据造成影响 
- 6.为了方便触发action,redux提供**bindActionCreators**,用于增强action创建函数的功能,不仅可以创建action,并且创建后自动完成分发

# Reducer

Reducer 用于改变数据的函数

- 1.一个数据仓库只有一个reducer
- 2.为了方便管理,通常将reducer放到单独的文件
- 3.reducer被调用的时机
     - 1.通过store.dispatch,分发一个action,此时调用reducer
     - 2.当创建一个store时,调用一次reducer
        - 1.使用这一点,初始化reducer状态
        - 2.创建仓库时,不传递任何默认状态
        - 3.将reducer的参数state设置一个默认值   
- 4.reducer内部通常使用switch来判断type值
- 5.**为什么reducer必须是一个没有副作用的纯函数**
    - 1.为什么需要纯函数
       - 1.纯函数有利于测试和调试
       - 2.有利于还原数据
       - 3.有利于将来与react结合时的优化
     - 2.具体要求
       - 1.不能改变参数,如果要状态该变,必须得到一个新的状态
       - 2.不能有异步
       - 3.不能对外部环境造成影响
- 6.大型项目中比较复杂,需要对reducer细分
    - 1.redux提供**combineReducers**方法,得到一个新的reducer




# Store

Store:用于保存数据

通过createStore方法创建对象

对象成员:{
    dispatch:分发action
    getState:得到仓库中当前的状态
    replaceReducer:替换掉当前的reducer
    subscribe:注册一个监听器,监听器为一个无参函数,分发一个action之后,会运行注册的监听器.该函数返回一个函数,用于取消监听 **unListen()**
}


# createStore

返回一个对象

dispatch:分发action
getState:得到仓库中当前的状态
subscribe:注册一个监听器,监听器为一个无参函数,分发一个action之后,会运行注册的监听器.该函数返回一个函数,用于取消监听 **unListen()**

# bindActioncreators




# conbineReducers
- 组装reducers,返回一个reducer,数据使用一个对象表示,对象的属性名与传递的参数对象保持一致

# Redux中间件(Middleware)

- 中间件类似插件,在不影响原本功能,并且改变原本代码的基础上,对其功能进行增强,在redux中,中间件主要用于增强dispatch函数
- 中间件基本原理,更改仓库中的dispatch函数
- Redux中间件书写：
   - 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch。该函数运行的时间，是在仓库创建之后运行。

       - 由于创建仓库后需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件
       - 需要调用applyMiddleware函数，将函数的返回结果作为createStore的第二或第三个参数。
- 中间件函数必须返回一个dispatch创建函数

- applyMiddleware函数，用于记录有哪些中间件，它会返回一个函数

   - 该函数用于记录创建仓库的方法，然后又返回一个函数

# 手写applyMiddleware
middleware的本质,是调用后可以得到dispatch创建函数的函数

compose:函数组合,将一个数组中的函数进行组合,形成一个新的函数,该函数调用时实际上是反向调用之前组合的函数