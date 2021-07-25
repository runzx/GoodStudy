模型
  映射数据库
  对象化数据
  ADCU
  BLL

接连数据库
  Repository仓库模式

  仓库接口
  public interface INoodleRespository{
    IEnumerable<Noodle> GetNoodles();
    Noodle GetNoodleById(int Id);
  }