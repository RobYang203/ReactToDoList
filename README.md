# ReactToDoList

### 架構

#### 資料結構
* id - number
* position - number
    * 所處陣列位置
* type - string
    * w = 待辦
    * d = 刪除
    * f = 結束
* date - date string
* description - string
```js
{
    id:0,
    type: 'w',
    date:'2020-03-27T00:00:00',
    description:'do what'
}
```
#### 畫面
* 外框
    * 輸入區
        * 輸入框
        * 確認按鈕
    * 列表區
        * 單筆事項
            * 顯示資料
            * 刪除按鈕
            * 結束按鈕

#### 動作
* App
    * 維護資料
    * 建立 InputArea 
    * 根據資料建立 DoThingItem
    * 接收 DoThingItem 動作來改變資料
* InputArea
    * 在`輸入區`輸入待辦事項
    * 按下`確認按鈕`，建立一筆資料格式，保存在`外框`並在`列表區`顯示
* DoThingItem
    * `列表區` 根據資料建立`單筆事項`
    * `單筆事項` 根據 type 判斷顯示方式，`type = d 不顯示`
    * 按下`結束按鈕`，判斷目前資料**type**，訊號送至`外框`改變狀態
        * `type = w` 轉 **f**
        * `type = f` 轉 **w**
    * 按下`刪除按鈕`，訊號送至`外框`，回傳**position**刪除指定資料

