# Generated by Django 5.1.1 on 2024-11-28 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('specialty', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('average_wait_time', models.IntegerField(default=0)),
            ],
        ),
    ]
