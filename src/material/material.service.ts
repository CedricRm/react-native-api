import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material-dto';
import { UpdateMaterialDto } from './dto/update-material-dto';
import { Material } from './entities/material.entity';
import { MaterialState } from './interfaces/material-states-interface';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  /**
   * Find all materials
   * @returns {Promise<Material[]>}
   */
  async findAll(): Promise<Material[]> {
    try {
      return (await this.materialRepository.find()) || [];
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Find material by id
   * @param id id of the material
   * @returns {Promise<Material>}
   */
  async findById(id: number): Promise<Material> {
    try {
      const material = await this.materialRepository.findOneBy({ id });
      if (!material) {
        throw new Error('Material not found');
      }
      return material;
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Create a new material
   * @param materialDatas new material datas : CreateMaterialDto
   * @returns {Promise<Material>}
   */
  async createMaterial(materialDatas: CreateMaterialDto): Promise<Material> {
    try {
      return await this.materialRepository.save(materialDatas);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Update material by id
   * @param id id of the material
   * @param materialDatas update value of the material: UpdateMaterialDto
   * @returns {Promise<Material>}
   */
  async UpdateMaterialById(
    id: number,
    materialDatas: UpdateMaterialDto,
  ): Promise<void> {
    console.log(materialDatas);
    try {
      await this.materialRepository.update(id, materialDatas);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Count all materials
   * @returns {Promise<Number>}
   */
  async getTotalMaterials(): Promise<number> {
    try {
      return await this.materialRepository.count();
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Count all bad materials
   * @returns {Promise<Number>}
   */
  async getTotalBadMaterials(): Promise<number> {
    try {
      return await this.materialRepository.count({
        where: { state: MaterialState.BAD },
      });
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Count all good materials
   * @returns {Promise<Number>}
   */
  async getTotalGoodMaterials(): Promise<number> {
    try {
      return await this.materialRepository.count({
        where: { state: MaterialState.GOOD },
      });
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Count all good materials
   * @returns {Promise<Number>}
   */
  async getTotalDamagingMaterials(): Promise<number> {
    try {
      return await this.materialRepository.count({
        where: { state: MaterialState.DAMAGING },
      });
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Remove material by id
   * @param id id of the material
   * @returns {Promise<void>}
   */
  async deleteById(id: number): Promise<void> {
    try {
      const materialToRemove = await this.findById(id);
      if (!materialToRemove) {
        throw new Error('Material not found');
      }
      await this.materialRepository.remove(materialToRemove);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
