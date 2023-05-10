import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as fsExtra from 'fs-extra';

const options = {
  debug: true,
};
/**
 * Migration utils functions.
 * From https://github.com/typeorm/typeorm/blob/2bb0e398f922561f1cbb8ebbb19d20aa093e8bc2/src/commands/MigrationGenerateCommand.ts
 */
export class MigrationUtils {
  /**
   * Creates directories recursively.
   */

  static createDirectories(directory: string): Promise<void> {
    return fsExtra.ensureDir(directory);
  }

  /**
   * Creates a file with the given content in the given path.
   */
  static async createFile(
    filePath: string,
    content: string,
    override = true,
  ): Promise<void> {
    await MigrationUtils.createDirectories(path.dirname(filePath));
    return fsExtra.outputFile(filePath, content);
  }

  /**
   * Reads everything from a given file and returns its content as a string.
   */
  static async readFile(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, (err, data) =>
        err ? fail(err) : resolve(data.toString()),
      );
    });
  }

  static async fileExists(filePath: string) {
    return fs.existsSync(filePath);
  }
}
