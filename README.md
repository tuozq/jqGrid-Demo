# jqGrid-Demo
记录jqGrid参数方法事件、基本用法

## 表格colModel配置参数详解
### formatter 格式化单元格

对列进行格式化，如枚举列，列值实际为枚举值，需要转换为别名显示

```javascript
// 实际jqGrid内置了select下拉列表的格式化参数，可以直接配置 formatter: 'select'， 无需自定义formatter，unformat
// 此处为演示这两个参数的用法场景
var selectValOfSex = {1: '男', 2: '女'};

// select类型 格式化值为别名，表格显示值
function selectFormatter(cellvalue, options, rowObject){
	// 获取列配置的下拉选项值
	var value = options.colModel.editoptions.value;
	return value[cellvalue] || '';
}

{
	 name : 'sex',
	 index : 'name',
	 width : 100, 
	 editable : true,
	 edittype: 'select',
	 // 下拉框
	 editoptions:{value: selectValOfSex},
	 // formatter: 'select',
	 formatter: selectFormatter,
	 unformat: selectUnFormatter
 },
```
### unformat 反格式化单元格

对列进行反格式化，如枚举列，被formatter格式化之后，getRowData获取到的列值为别名，如需要获取枚举值，则需要通过unformat处理

```javascript
var selectValOfSex = {1: '男', 2: '女'};

// select类型 格式化别名为值，grid.jqGrid("getRowData")获取到的值
function selectUnFormatter(cellvalue, options, rowObject){
	// 获取列配置的下拉选项值
	var value = options.colModel.editoptions.value;
	for(var key in value){
		if(value[key] == cellvalue){
			return key;
		}
	}
	return '';
}
 ```
