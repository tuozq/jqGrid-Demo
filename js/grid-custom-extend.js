	(function($){
		$.jgrid && $.jgrid.extend({
			// 表格编辑完，数据保存完后，编辑状态还在，调用该方法清除该状态。
			acceptChangedCells: function() {
				this.each(function(){
					var $t= this;
					$($t.rows).each(function(j){
						if ($(this).hasClass("edited")) {	
							$(this).removeClass('edited');
							$('td.success',this).removeClass('success');
						}
					});
				});
			},
			// 如果存在编辑状态的单元格，则保存
			endEdit: function() {
				var $cell = this.find(".edit-cell");
				if($cell.length > 0) {
				    var iRow = $cell.closest("tr").index(), iCol = $cell.index();
				    this.jqGrid("saveCell", iRow, iCol);
				}
			},
			// 设置某个单元格锁定状态
			setLock: function(rowId, cokKey, isLock) {
				if(isLock){
					this.jqGrid('setCell', rowId, cokKey, '', 'not-editable-cell');
				}else{
					var gridTableId = $(this).attr("id");
					$(this).find("tr[id='"+ rowId +"']").find("td[aria-describedby='"+ gridTableId + '_' + cokKey +"']").removeClass('not-editable-cell');
				}
			},
			// 添加合计行
			appentFootRow: function(colKeys) {
				var rows = this.jqGrid("getRowData");
				var footerData = {invdate: "合计"};
				for(var colKey of colKeys){
					footerData[colKey] = 0;
				}
				for(var i = 0, l = rows.length; i<l; i++) {
					for(var colKey of colKeys){
						footerData[colKey] = footerData[colKey] + parseFloat(rows[i][colKey]);
					}
				}
				this.jqGrid("footerData", "set", footerData);
			},
			// 日期输入控件配置
			customDateEditoptions: function(dateOptions){
				return {
					custom_element: function(value, options){
						var el = $('<input type="text" name="birthday" class="Wdate" onclick="WdatePicker('+ (dateOptions||'') +')">');
						el.val(value);
						return el;
					},
					custom_value: function(elem, operation, value){
						if (operation === 'get') {   
							return $(elem).val();   
						} else if (operation === 'set') {  
							$(elem).val(value);  
						}  
					}
				}
			},
			// 验证数字
			numberValidate: function(value, column) {
				if(isNaN(value)){
					return [false, '请输入正确的数字!'];
				}else{
					return [true, ''];
				}
			}
				
		});
	})(jQuery);
