DTO 数据传输对象

post 接收json对象，可以这样定义

@RequestBody Map<Strint, object> person // 每次要装箱，性能不好

所以定义为每个传入、返回的 body 定义DTO:

@Getter // LomBok
@Setter
// @AllArgsConstructor
@RequestArgsConstructor // 为不为空的生成构造函数
@NoArgsConstructor
public class PersonDTO{
  @NonNull
  private String name;
  private Integer age;
}

@RequestBody PersonDTO person

@Builder
不能再用 new PersonDTO()
要 ：
PersonDTO dto=PersonDTO.builder().name("zhaix").age(28).build()
还要再加: @Getter

JSR   java Specification Requests jave request 规范
