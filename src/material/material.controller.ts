import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material-dto';
import { UpdateMaterialDto } from './dto/update-material-dto';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get('')
  FindAllMaterials() {
    return this.materialService.findAll();
  }

  @Get(':id')
  FindMaterialById(@Param() id: number) {
    return this.materialService.findById(id);
  }

  @Get('count/all')
  getTotalMaterials() {
    return this.materialService.getTotalMaterials();
  }

  @Get('count/bad')
  getTotalBadMaterials() {
    return this.materialService.getTotalBadMaterials();
  }

  @Get('count/good')
  getTotalGoodMaterials() {
    return this.materialService.getTotalGoodMaterials();
  }

  @Get('count/damaging')
  getTotalDamagingFMaterials() {
    return this.materialService.getTotalDamagingMaterials();
  }

  @Post('')
  createMaterial(@Body() material: CreateMaterialDto) {
    return this.materialService.createMaterial(material);
  }

  @Patch(':id')
  UpdateMaterialById(
    @Param() id: number,
    @Body() materialDatas: UpdateMaterialDto,
  ) {
    return this.materialService.UpdateMaterialById(id, materialDatas);
  }

  @Delete(':id')
  DeleteMaterialById(@Param() id: number) {
    return this.materialService.deleteById(id);
  }
}
