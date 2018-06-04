import { Component, OnInit } from '@angular/core';
import { ManageStudentsService } from './manage-students.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
  providers: [ManageStudentsService]
})
export class ManageStudentsComponent implements OnInit {

  statusupdatestudent: boolean = true;
  statusaddstudent: boolean = false;
  
  searchText: string = '';
  
  arrStudents = [];
  arrClasses = [
    { id: 'D15PM01' },
    { id: 'D15PM02' }
  ];

  nameos: string;
  classos: string = '';
  dobos: string;
  
  constructor(private getJson: ManageStudentsService, private http: Http) {

  }

  ChangeValue(event :any)
  {
    this.classos = event.target.value;
  }
  getAllData()
  {
    this.arrStudents = [];
    this.getJson.getData().subscribe(resJson => this.arrStudents = resJson);
  }
  AddStudent(formAddStudent) {
    this.statusaddstudent = !this.statusaddstudent;
    if (this.statusaddstudent === false)
    {
      const url = 'http://192.168.101.129:8080/student';
      console.log(formAddStudent.value);
      //console.log(this.getJson.sendPostForm(url,formAddStudent.value));
    }
  }

  CannelAddStudent() {
    this.statusaddstudent = false;
  }
  DeleteStudent(student: any) {
    const url = 'http://192.168.101.129:8080/student/'+student.id;
    let cf = confirm("Bạn có muốn xóa sinh viên "+student.name)
    if (cf==true)
    {
      console.log(this.getJson.sendDeleteForm(url,student.id));
      const index = this.arrStudents.findIndex(std => std.id = student.id);
      this.arrStudents.splice(index,1);
    }
    
  }

  UpdateStudent(id: number) {
      
      if (this.statusupdatestudent === false)
      {
        alert(this.classos);
      }
      this.statusupdatestudent = !this.statusupdatestudent;
  }
  UpdateStudentIn(student: any)
  {
    this.statusupdatestudent = false;
    this.nameos = student.name;
    this.classos = student;
    this.dobos = student.dateOfBirth;
    alert(this.classos);
  } 

  CannelUpdateStudent()
  {
    this.statusupdatestudent = true;
  }

  ngOnInit() {
    this.getAllData();
  }

}
