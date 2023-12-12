from django.db import models

class Accounts(models.Model):
    username  = models.TextField()
    password = models.TextField()
    email = models.EmailField()
    dob = models.DateField()
  