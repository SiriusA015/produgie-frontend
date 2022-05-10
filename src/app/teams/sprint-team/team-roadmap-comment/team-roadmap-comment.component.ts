import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SprintServiceService } from '../sprint-service.service';

@Component({
  selector: 'app-team-roadmap-comment',
  templateUrl: './team-roadmap-comment.component.html',
  styleUrls: ['./team-roadmap-comment.component.scss']
})
export class TeamRoadmapCommentComponent implements OnInit {
  commentForm: FormGroup;
  comments: any;
  commentsCount: any;

  constructor(public dialogRef: MatDialogRef<TeamRoadmapCommentComponent>,private sprintService: SprintServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,  private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getComments();
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }
  submitComment(){
    let name= localStorage.getItem('userName')
    console.log(this.commentForm.value);
    let data={
      name:name,
      comment:this.commentForm.value.comment,
      selected_action_id:this.data
    }
    this.sprintService.submitComment(data).subscribe((res:any)=>{
      console.log(res);
      this.commentForm.reset();
      this.getComments();
    },error=>{

    })
  }
  getComments(){
    this.sprintService.getComments(this.data).subscribe((res:any)=>{
      console.log(res);
      this.comments = res.comments;
      this.commentsCount = res.records;
      localStorage.setItem('commentCount' , this.commentsCount)
    },error=>{

    })
  }

  onDismiss(){
    this.dialogRef.close();
  }

}
