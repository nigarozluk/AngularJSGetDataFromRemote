import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Value } from '../Models/value';

declare var $: any 

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  constructor(private http:HttpClient) { }

  values:Value[]=[];
  dtOptions: DataTables.Settings = {};
  // dtOptions: any = {};

  ngOnInit(): void {
    var that = this;

    this.dtOptions = {
        pagingType: 'full_numbers',
        lengthChange: false,
        searching: false,
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters: any, callback) => {
          console.log(dataTablesParameters);
            that.http
                .get<Value[]>('https://jsonplaceholder.typicode.com/photos?albumId=1')
                .subscribe(resp => {
                    that.values = resp;

                    callback({
                        recordsTotal: resp.length,
                        recordsFiltered:resp.length,
                        draw:dataTablesParameters.draw,
                        data: resp.slice((dataTablesParameters.start),dataTablesParameters.start+10),
                    });
                });
        },
        
        columns: [
            { data: "albumId" },
            { data: "id",
            render: function (data, type, full, meta){
              return `<p class="dataname">${full.id}</p>`;
            }
            },
            { data: "title" },
            { data: "url" },
            { data: "thumbnailUrl" },
            { render: function (data, type, full, meta) {
              return `<button type="button" data-id="${full.id}" data-url="${full.url}" data-title="${full.title}" data-thumbnailurl="${full.thumbnailUrl}" class="editdata btn btn-success"><span class="glyphicon glyphicon-edit"></span></button>`;
          } },
          { render: function (data, type, full, meta) {
            return `<button type="button" data-id="${full.id}" class="deletedata btn btn-danger"><i class="fa fa-close"></i></button>`;
        } },
        ],  
    };

    $(document).on( 'click', '.deletedata', function (e: any) {
      console.log(e.target.getAttribute("data-id"));
      var nam=e.target.getAttribute("data-id");
      if(nam!=null)
      {
        $(".nameval").text(nam);
        $("#myModalDelete").modal('show');
      }
     
  } );
  $(document).on( 'click', '.editdata', function (e: any) {
   var id=e.target.getAttribute("data-id");
   var url=e.target.getAttribute("data-url");
   var title=e.target.getAttribute("data-title");
   var thumbnailUrl=e.target.getAttribute("data-thumbnailurl");
   console.log(url);
    if(id!=null)
    {
      $(".furl").val(url);
      $(".ftitle").val(title);
      $(".fthumbnailurl").val(thumbnailUrl);
      $("#myModalEdit").modal('show');
    }
   
} );
  $(document).on('click', '[data-dismiss="modal"]', function() {
      $("#myModalEdit").modal('hide');
      $("#myModalDelete").modal('hide');
  });
  

  $(document).on('click', '.deletebutton', function() {
    var val=$(".nameval").text();
    if(val!=null){
      alert("there is only the frontend part. Do Not backend coding done for now.");
    }
});
$(document).on('click', '.editbutton', function() {
  var val=$(".nameval").text();
  if(val!=null){
   alert("there is only the frontend part. Do Not backend coding done for now.");
  }
});
 
}




}
