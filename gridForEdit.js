var $grid = null;
$(function(){
	//页面加载完成之后执行
	pageInit();
});
function pageInit(){
	var mydata = [ 
                 {invdate : "2007-10-01",name : "test", sex: '1',note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {invdate : "2007-10-02",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
                 {invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
                 {invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {invdate : "2007-10-05",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
                 {invdate : "2007-09-06",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}, 
                 {invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"}, 
                 {invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"}, 
                 {invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"} ,
               ];
	
	
	var selectValOfSex = {1: '男', 2: '女'};
	
	// select类型 格式化值为别名，表格显示值
	function selectFormatter(cellvalue, options, rowObject){
		// 获取列配置的下拉选项值
		var value = options.colModel.editoptions.value;
		return value[cellvalue] || '';
	}
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
	
	loadGrid(mydata);
	
	function loadGrid(mydata){
		$grid = $("#list2");
		$grid.jqGrid(
		  {
			data : mydata,
			multiselect : true,
			datatype : "clientside",
			rownumbers: true,  //显示序列号
			rownumWidth:35,　　//序号列宽
			height : 250,
			colNames : [ 'Date', 'Client', 'Sex',  'Amount', 'Tax','Total', 'Notes', "SOC" ],
			colModel : [ 
						 {
							 name : 'invdate',
							 index : 'invdate',
							 width : 90,sorttype : "date",
							 editable: true, 
							 // 自定义输入控件
							 edittype: 'custom',
							 editoptions: $grid.customDateEditoptions("{dateFmt:'yyyy-MM-dd HH:mm:ss'}")
						 }, 
						 {name : 'name',index : 'name',width : 100, editable : true}, 
						 {
							 name : 'sex',
							 index : 'name',
							 width : 100, 
							 editable : true,
							 edittype: 'select',
							 // 下拉框
							 editoptions:{value: selectValOfSex},
							 // formatter: 'select'
							 formatter: selectFormatter,
							 unformat: selectUnFormatter
						 }, 
						 // 普通输入框，editrules 自定义数据验证规则
						 {name : 'amount',index : 'amount',width : 80,align : "right",sorttype : "float", editable : true,  editrules: {custom:true, custom_func:$grid.numberValidate}}, 
						 {name : 'tax',index : 'tax',width : 80,align : "right",sorttype : "float"}, 
						 {name : 'total',index : 'total',width : 80,align : "right",sorttype : "float"}, 
						 {name : 'note',index : 'note',width : 150,sortable : false} ,
						 {name : 'soc',index : 'note',width : 50,align : "center",editable : true, edittype: 'checkbox', editoptions: {value: '是:否'}} 
					   ],
			cellEdit: true,
			cellsubmit: "clientArray",
			footerrow: true,
			gridComplete: function() {
				$grid.appentFootRow(['amount']);
				$grid.setLock("1", "amount", true);
			}

		  });
		  
		  // 设置合并表头
		  // numberOfColumns 要合并的列数量
		  // startColumnName 合并的开始列
		  // titleText 合并列显示值
		  $grid.setGroupHeaders({
				useColSpanStyle: true,
				groupHeaders: [
					{"numberOfColumns": 3, "titleText": "个人信息", "startColumnName": "name"}
				]
			});
	}
  
  // 保存
  $("#btnsave").click(function(){
	  $grid.setLock("1", "amount", false);
	  // 结束表格编辑状态
	  $grid.endEdit();
	  // 添加合计行
	  $grid.appentFootRow(['amount']);
	   // 获取表格数据  
	  var rows = $grid.jqGrid("getRowData");
	  console.log("保存后的数据：", rows);
  })


}