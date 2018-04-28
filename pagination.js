        //��ҳ�������Ѿ���װ�ã������е���
        (function ($, window, document, undefined) {
          var initDate = {
            pageNo: 1,
            totalPage: 1,
            callback: function () {
            }
          };

          function Paging(element, options) {
            this.element = element;
            this.options = options = $.extend(initDate, options || {});
            this.init();
          }

          Paging.prototype = {
            constructor: Paging,
            init: function () {
              this.creatHtml();
              this.bindEvent();
            },
            creatHtml: function () {
              var me = this;
              var content = "";
              var current = me.options.pageNo;
              var total = me.options.totalPage;
//              if (current > 1) {
//                content += "<a class='page-link'>Prev</a>";
//              }
              if (total > 7) {
                if (current < 4) {
                  for (var i = 1; i < 7; i++) {
                    if (current === i) {
                      content += '<a href=" '+ myURL + i +' " class="current page-link">'+i+'</a>';
                    } else {
                      content += '<a href=" '+ myURL + i +' " class="page-link">'+i+'</a>';
                    }
                  }
                  content += "<a class='page-link'>...</a>";
                  content += '<a href=" '+ myURL + i +' " class="page-link">' + total + '</a>';
                } else {
                  if (current < total - 3) {
                    content += '<a name="1" type="button" class="page num page-link">1</a>';
                    content += "<a class='page-link'>...</a>";
                    for (var i = current - 2; i < current + 3; i++) {
                      if (current === i) {
                        content += '<a href=" '+ myURL + i +' " class="current page-link">'+i+'</a>';
                      } else {
                        content += '<a href=" '+ myURL + i +' " class="page-link">'+i+'</a>';
                      }
                    }
                    content += "<a class='page-link'>...</a>";
                    content += '<a href=" '+ myURL + i +' " class="page-link">' + total + '</a>';
                  } else {
                    content += "<a class='page-link'>1</a>";
                    content += "<a class='page-link'>...</a>";
                    for (var i = total - 5; i < total + 1; i++) {
                      if (current === i) {
                        content += '<a href=" '+ myURL + i +' " class="current page-link">'+i+'</a>';
                      } else {
                        content += '<a href=" '+ myURL + i +' " class="page-link">'+i+'</a>';
                      }
                    }
                  }
                }
              } else {
                for (var i = 1; i < total + 1; i++) {
                  if (current === i) {
                    content += '<a href=" '+ myURL + i +' " class="current page-link">'+i+'</a>';
                  } else {
                    content += '<a href=" '+ myURL + i +' " class="page-link">'+i+'</a>';
                  }
                }
              }
//              if (current < total) {
//                content += "<a class='page-link'>Next</a>";
//              }
              content += "<span class='page-link switch-to-page'>To</span>";
              content += "<input class=\'page-input\' max='3' maxlength='3' value='" + current + "' type='text' />";
              content += "<span class='page-link page-ye'>ҳ</span>";
              content += "<a class='page-link'>Go</a>";
              me.element.html(content);
            },
            bindEvent: function () {
              var me = this;
              me.element.on('click', 'a', function () {
                var num = $(this).html();
                if (num === "&lt;") {
                  me.options.pageNo = +me.options.pageNo - 1;
                } else if (num === "&gt;") {
                  me.options.pageNo = +me.options.pageNo + 1;
                } else if (num === "Go") {
                  var ipt = +me.element.find('input').val();
                  if (ipt && ipt <= me.options.totalPage && ipt !== me.options.pageNo) {
                    me.options.pageNo = ipt;
                  }
                } else {
                  me.options.pageNo = +num;
                }
                me.creatHtml();
                if (me.options.callback) {
                  me.options.callback(me.options.pageNo);
                }
              });
            }
          };
          $.fn.paging = function (options) {
            options = $.extend(initDate, options || {});
            return new Paging($(this), options);
          }
        })(jQuery, window, document);

        //��ҳ�������� С��������
        $(function () {
          $('#page').paging({   //(�˴����������������ں�̨���ݣ���ǰҳ����ҳ��ֻ�贫�Σ��������Ѿ���װ��)
            pageNo: data.page, totalPage: data.totalPages   
          });
        });