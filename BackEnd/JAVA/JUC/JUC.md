[toc]

##  一、什么是JUC



## 二、基础

### 1. 线程与进程

1.1 进程

1.2 线程

- 定义

- 线程有几个状态：

  ```java
  public enum State {
      /**
       * 新生
       */
      NEW,
  
      /**
       * 运行
       */
      RUNNABLE,
  
      /**
       * 阻塞
       */
      BLOCKED,
  
      /**
       * 等待
       */
      WAITING,
  
      /**
       * 超时等待
       */
      TIMED_WAITING,
  
      /**
       * 终止
       */
      TERMINATED;
  }
  ```

  

- wait和sleep的区别

  ```
  1. 来自不同的类，wait->Object,sleep->Thread
  2. 关于锁的释放，wait会释放锁，sleep不会释放锁
  3. 使用的范围不同，wait只能在同步代码块中使用，而sleep可以在任何地方使用
  4. 是否需要捕获异常：wait不需要，sleep需要
  ```

- 线程是一个单独的资源类，没有任何附属的操作

### 2. 并发与并行

#### 2.1 并发

  	-  定义：

  	- 本质：充分利用CPU资源

#### 2.2 并行

- 定义：
- 

### 3. Lock锁（重点）

#### 3.1 synchronized

#### 3.2 Lock锁

- 常用的有：可重入锁、读锁、写锁

- 公平锁：十分公平，可以按顺序

- 非公平锁：十分不公平，可以插队

- Lock接口

- synchronized和Lock的区别

  ```
  1.synchronized是JAVA内置关键字，Lock是一个java类
  2. synchronized无法判断锁的状态，Lock可以判断锁的状态；
  3.synchronized会自动释放锁,lock需要手动释放锁，如果不释放，会导致死锁；
  4.synchronized会一直等待锁，lock不一定会等待下去；
  5.synchronized是可重入锁，不可以中断的，公平的；lock是可重入锁，可以判断锁，非公平的（可自定义）；
  6. synchronized适合锁少量的代码同步问题，lock适合锁大量的同步代码。
  ```

- 锁是什么？如何判断锁的是谁

  

-  官方文档指出：if会导致线程的虚假唤醒，要使用while,**等待应该总是出现在循环中**
```java
  public synchronized void increment() throws Exception {
        //if会导致线程的虚假唤醒，要使用while,等待应该总是出现在循环中
        while (number != 0) {
            // 等待
            this.wait();
        }
        number++;
        //通知其他线程，完成+1操作
        System.out.println(Thread.currentThread().getName() + " => " + number);
        this.notifyAll();
    }

```

 

#### 4. Condition

```java
class Data2 {
    private int number = 0;

    Lock lock = new ReentrantLock();
    Condition condition = lock.newCondition();

    public synchronized void increment() throws Exception {
        lock.lock();
        try {
            //if会导致线程的虚假唤醒，要使用while,等待应该总是出现在循环中
            while (number != 0) {
                // 等待
                condition.await();
            }
            number++;
            //通知其他线程，完成+1操作
            System.out.println(Thread.currentThread().getName() + " => " + number);
            condition.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}
```

- 优点：可以精准的通知和唤醒线程
- 

### 5. 8锁

- 定义：8锁就是关于锁的8个问题
- 小结：static是一个全局模板的Class；

### 6. 集合类的不安全


### 7. Callable

定义：Callable 类似于runnable，可以有返回值，可以抛出异常，方法不同

### 8.常用的辅助类

java.util.concurrent.CountDownLatch


