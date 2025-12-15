---
title: '汇编代码'
description: '汇编期末'
date: '2025-12-15'
draft: false
category: '期末'
---





(一) 将两个用ASCII字符串表示的两位十进制数 (`'47'` 和 `'69'`) 进行相加（即 `47+69`），计算并显示其十进制结果（`"116"`）。

(二)查表转换程序。使用 `XLAT` 指令，将一个BCD码数字 (`05H`) 通过七段数码管码表 (`TABLE7`) 转换为对应的段码，并存储结果。

(三)交互式信息显示程序。显示一条提示信息，等待用户输入。如果用户输入 `'Y'`，则显示一条特定信息；否则，显示另一条信息。

(四)数学计算程序。根据变量 `X`, `Y`, `Z` 的值，计算表达式 `{10*(X+Y) - 3*(Z-1)} / 2` 的结果，并将结果存入变量 `FUN`。

(五)成绩等级评定程序（基于固定值）。根据固定的分数 (`60`) 使用跳转表法判断并显示对应的等级（A+, A, A-, B+, B）。

(六)成绩等级评定程序（基于固定值）。根据固定的分数 (`87`) 使用一系列条件跳转判断等级（A, B, C, D, E），并将等级字符存入变量。

(七)带输入和跳转表的成绩评定程序。从键盘输入一个两位数的成绩字符串，将其转换为数值，然后使用跳转表法判断等级（A, B, C, D），最后在屏幕上显示等级。

(八)带输入和显示的成绩评定程序（简化版）。从键盘输入一个两位数的成绩字符串，将其转换为数值，然后使用条件跳转判断等级（A, B, C, D），最后在屏幕上显示等级。





### （一）（523）

```
DATA    SEGMENT	
VAL1    BYTE '47'       ; 表示数字47
VAL2	BYTE '69'       ; 表示数字69
RES	BYTE 3 DUP (?)   ; 存储结果，最多3位
DATA	ENDS

STACK	SEGMENT STACK 'STACK'	
BYTE 	100 DUP (?)  ; 栈空间
STACK	ENDS

CODE	SEGMENT			
ASSUME CS:CODE, DS:DATA, SS:STACK

START:	MOV AX, DATA		
MOV DS, AX		   ; 初始化数据段

MOV AX, WORD PTR VAL1	; 将VAL1的ASCII码存入AX
XCHG AH, AL		   ; 交换高低位，得到正确的数字顺序
MOV BX, WORD PTR VAL2	; 将VAL2的ASCII码存入BX

; 处理个位相加
ADD AL, BH		   ; 个位相加（7 + 9）
AAA				   ; 调整ASCII码加法结果chinese
OR AL, 30H		   ; 转换为ASCII码
MOV RES+2, AL	   ; 保存个位结果

; 处理十位相加
MOV AL, AH		   ; 取出进位
XOR AH, AH		   ; 清除AH
ADD AL, BL		   ; 十位相加（6 + 4）
AAA				   ; 调整ASCII码加法结果
OR AX, 3030H	   ; 转换为ASCII码
MOV RES+1, AL	   ; 保存十位结果
MOV RES, AH		   ; 保存进位（百位）

; 确保字符串以'$'结尾
MOV RES+3, '$'

; 显示结果
MOV DX, OFFSET RES
MOV AH, 9	
INT 21H

; 程序结束
MOV AH, 4CH	
INT 21H		

CODE	ENDS
END START

```


### （二）（524）

```

.MODEL	SMALL
.STACK  	64
.DATA
TABLE7	BYTE  3FH,06H,5BH,4FH,66H,6DH,7DH,07H,7FH,6FH
VALBCD	BYTE 05H
RES7		BYTE  ?	
.CODE
.STARTUP	
MOV 	BX,   OFFSET TABLE7
MOV 	AL,   VALBCD
XLAT            
MOV 	RES7,  AL
.EXIT		
END 
```





### （三）（525）

```
DISP	MACRO	STR
	MOV DX, OFFSET STR
	MOV AH, 9
	INT 21H
	ENDM
.MODEL	SMALL
.STACK	64
.DATA
PROMPT1  BYTE 'There is a message for you from NEO.', SPACE
	    BYTE 'To read it enter Y','$'
MESSAGE   BYTE CR, LF, 'HI! I will meet you in the Matrix in 3009.', '$'
PROMPT2  BYTE	CR, LF, 'No more messages for you.', '$'
CR 	EQU	0DH	
LF	EQU	0AH
SPACE	EQU	20H
.CODE
START:	MOV AX,@DATA
	MOV DS,AX
	DISP PROMPT1
	MOV AH, 7
	INT 21H
	CMP AL, 'Y'
	JZ OVER
	DISP PROMPT2
	JMP EXIT
OVER:	DISP MESSAGE
EXIT:	MOV AH,4CH
	INT 21H
	END START
```





### （四）（551）

```
TITLE    EXAMPLE  PROGRAM
    DATA  SEGMENT	;设置数据段
    VARX	DW    123H	;变量X
    VARY	DW    456H	;变量Y
    VARZ	DW    789H	;变量Z
    FUN		DW    ?	;结果单元
    DATA   	ENDS
    STACK1  	SEGMENT   PARA  STACK;设置堆栈段
    DW   20H   DUP(0)
    STACK1  	ENDS
CODE	SEGMENT		;设置代码段
		ASSUME   CS: CODE, DS: DATA, SS: STACK1
START:	MOV	  AX, DATA	;置段基值于DS
		MOV	  DS, AX
		MOV	  AX, VARX	;取变量X
		ADD	  AX, VARY	;AX =（X+Y）
		MOV	  BX, AX	;BX =（X+Y）
		SAL	  AX, 1		;AX=2*（X+Y）
		SAL	  AX, 1		;AX = 4*（X+Y）
		ADD	  AX, BX	;AX = 5*（X+Y）
		SAL	  AX, 1		;AX = 10*（X+Y）
		MOV	  BX, VARZ	;取变量Z
		DEC	  BX		;BX =（Z-1）
		MOV	  CX, BX	;CX =（Z-1）
		SAL	  BX, 1		;BX = 2*（Z-1）
		ADD	  BX, CX	;BX = 3*（Z-1）
		SUB	  AX, BX	;AX = 10*(X+Y)- 3*(Z-1)
		SAR	  AX, 1		;AX = {10*(X+Y)- 3*(Z-1)}/2
		MOV	  FUN,AX	;存放计算结果
		MOV	  AH,4CH	;终止用户程序，返回DOS
		INT	  21H
CODE	ENDS
		END  START
```








### （五）（p227第11题）

```
.MODEL SMALL
.DATA
SCORE BYTE 60
AP BYTE 'A+','$'
A BYTE 'A','$'
AM BYTE 'A-','$'
BPL BYTE 'B+','$'
B BYTE 'B','$'
J_TAB WORD L1 ,L2,L3,L4,L5
.CODE
START: MOV AX, @DATA ;初始化段寄存器
    MOV DS, AX
    XOR AH,AH
    MOV AL,SCORE ;
    SUB AL,60   ; AL=AL-60
    MOV BL,10   ; BL =10
    DIV BL      ; 将分数段划分为 10 分一个区间 AL/10，商存入AL，余数存入AH
    MOV BL,AL   ; 将商从AL传到BL
    XOR BH,BH   ; 实现多分支的程序段, 使得BX寄存器的高8位为0
    SHL BX,1    ; 计算2*(PARAM)
    JMP J_TAB[BX]; 根据索引跳转到跳转表
L1: MOV DX,OFFSET B
    MOV AH,9  ; 显示
    INT 21H
    JMP NEXT
L2: MOV DX,OFFSET BPL
    MOV AH,9
    INT 21H
    JMP NEXT
L3: MOV DX,OFFSET AM
    MOV AH,9
    INT 21H
    JMP NEXT
L4: MOV DX,OFFSET A
    MOV AH,9
    INT 21H
    JMP NEXT
L5: MOV DX,OFFSET AP
    MOV AH,9
    INT 21H
    JMP NEXT
NEXT: MOV AH, 4CH
    INT 21H
END START
```





### （六）（6grade）

	DATA SEGMENT
	  score db 87
	  grade db ?
	DATA ENDS
	
	STACK1 SEGMENT PARA STACK
	DW 40H DUP(?)
	STACK1 ENDS
	
	CODE SEGMENT
		ASSUME CS:CODE , DS:DATA
	START:	MOV AX,DATA
		MOV DS,AX
	mov al,score
	
	cmp al,90
	jge branch1
	cmp al,80
	jge branch2
	cmp al,70
	jge branch3
	cmp al,60
	jge branch4
	branche: mov ah,'E'
		jmp finish
	branch1:  mov ah,'A'
		jmp finish
	branch2: mov ah,'B'
		jmp finish
	branch3: mov ah,'C'
		jmp finish
	branch4: mov ah,'D'
		jmp finish
	finish: mov grade, ah
	MOV AH,4CH
	INT 21H
	CODE ENDS
	END START
	
​	



### （七）（6grade_2）

    DATA SEGMENT
      buf   db 3        ;缓冲区长度
            db ?        ;实际输入个数
      str1  db 3 DUP(?) ;存储空间
    
      score db 87
      disp   db 0dh, 0ah
      grade db ?,'$'
    
      ; 跳转表：存储各个分支的地址
      jmp_table dw branch1, branch2, branch3, branch4
    DATA ENDS
    
    STACK1 SEGMENT PARA STACK
    DW 40H DUP(?)
    STACK1 ENDS
    
    CODE SEGMENT
        ASSUME CS:CODE , DS:DATA
    START: MOV AX,DATA
        MOV DS,AX
    mov dx, offset buf
    mov ah, 0ah
    int 21h
    
    ;=(str1[0]-'0')*10+(str1[1]-'0')=
    mov al, str1[0]
    sub al,'0'
    mov bl, 10
    mul bl
    mov bl, str1[1]
    sub bl, '0'
    add al, bl
    
    ; 将成绩存入score变量
    mov score, al
    
    ; 使用跳转表法判断等级
    mov al, score
    cmp al, 90
    jae level0      ; >=90 跳转到level0
    cmp al, 80
    jae level1      ; >=80 跳转到level1
    cmp al, 70
    jae level2      ; >=70 跳转到level2
    jmp level3      ; 其他情况跳转到level3
    level0:
        mov bx, 0       ; 对应branch1在跳转表中的索引0
        jmp do_jump
    level1:
        mov bx, 2       ; 对应branch2在跳转表中的索引1（每个地址占2字节）
        jmp do_jump
    level2:
        mov bx, 4       ; 对应branch3在跳转表中的索引2
        jmp do_jump
    level3:
        mov bx, 6       ; 对应branch4在跳转表中的索引3
    
    do_jump:
        ; 使用跳转表进行跳转
        jmp jmp_table[bx]
    
    branch1:  
        mov ah,'A'
        jmp finish
    branch2: 
        mov ah,'B'
        jmp finish
    branch3: 
        mov ah,'C'
        jmp finish
    branch4:
        mov ah,'D'
    
    finish:      
        mov grade, ah  
    ; 显示结果
    mov dx, offset disp
    mov ah, 9
    int 21h    
    
    MOV AH,4CH
    INT 21H
    
    CODE ENDS
    END START
    

  

### （八）（6grade_disp）

	DATA SEGMENT
	  buf   db 3		;缓冲区长度
	          db ?		;实际输入个数
	  str1  db 3 DUP(?)	;存储空间
	
	  score db 87
	  disp   db 0dh, 0ah
	  grade db ?,'$'
	
	DATA ENDS
	
	STACK1 SEGMENT PARA STACK
	DW 40H DUP(?)
	STACK1 ENDS
	
	CODE SEGMENT
		ASSUME CS:CODE , DS:DATA
	START:	MOV AX,DATA
		MOV DS,AX
	mov dx, offset buf
	mov ah, 0ah
	int 21h
	
	;=(str1[0]-'0')*10+(str1[1]-'0')=
	mov al, str1[0]
	sub al,'0'
	mov bl, 10
	mul bl
	mov bl, str1[1]
	sub bl, '0'
	add al, bl
	
	;mov al,score
	cmp al,90
	jge branch1
	cmp al,80
	jge branch2
	cmp al,70
	jge branch3
	mov ah,'D'
	jmp finish
	branch1:  mov ah,'A'
		jmp finish
	branch2: mov ah,'B'
		jmp finish
	branch3: mov ah,'C'
		jmp finish
	finish:      mov grade, ah
	mov dx, offset disp
	mov ah,9
	int 21h	
	
	MOV AH,4CH
	INT 21H
	
	CODE ENDS
	END START
	

