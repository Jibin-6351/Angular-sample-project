import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth-service.service';
import { PasswordService } from './password.service';

@Component({
  selector: 'ngbd-modal-content',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <div class="modal-header">
      <h6 class="modal-title">Update Password</h6>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;">
        <label>Password</label>
        <input
          type="password"
          [formControl]="password"
          style="padding:4px; outline:none; border-radius:6px; "
        />

        <div style="display:flex;flex-direction:column;">
          <label> Confirm Password</label>
          <input
            type="password"
            [formControl]="conpassword"
            style="padding:4px; outline:none; border-radius:6px; "
          />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="onSubmit()"
        >
          Update
        </button>
      </div>
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  toast = inject(ToastrService);
  authServie = inject(AuthService);
  passwordService = inject(PasswordService);

  password = new FormControl('');
  conpassword = new FormControl('');

  onSubmit() {
    if (this.password.value === this.conpassword.value) {
      const id = this.authServie.getUser();
      this.passwordService
        .getData({ id: id, password: this.password.value })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.toast.success('Password Updated ');
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.activeModal.close('Close click');
    } else {
      this.toast.error('Invalid password');
    }
  }
  @Input() name!: string;
}

@Component({
  selector: 'ngbd-modal-component',
  standalone: true,
  templateUrl: './password.component.html',
})
export class NgbdModalComponent {
  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
